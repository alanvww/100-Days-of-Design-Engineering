import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo, Suspense } from 'react' // Added Suspense
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
// Import Gltf type (corrected casing)
import { useGLTF, useTexture, Environment, Lightformer, Gltf, Preload } from '@react-three/drei' // Gltf is the component, type is inferred or defined below
// Import RigidBody component and RapierRigidBody type for refs
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, type RapierRigidBody } from '@react-three/rapier' // Import the type directly
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

useGLTF.preload('/models/tag.glb')
useTexture.preload('/models/band.png')

// Define a type for the GLTF result based on its structure
type GLTFResult = { // Removed Gltf &
  nodes: {
    card: THREE.Mesh
    clip: THREE.Mesh
    clamp: THREE.Mesh
  }
  materials: {
    base: THREE.MeshPhysicalMaterial
    metal: THREE.MeshStandardMaterial
  }
}

// Define an augmented RigidBody type (using the imported RapierRigidBody type) to include the custom 'lerped' property
type LerpableRigidBody = RapierRigidBody & { lerped?: THREE.Vector3 }


export default function TagComponent() {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      {/* Preload assets for smoother loading (optional but good practice) */}
      <Preload all />

      <ambientLight intensity={Math.PI} />
      {/* Wrap the physics and Band component in Suspense to handle asset loading */}
      <Suspense fallback={null}> {/* Fallback can be null or a simple placeholder mesh */}
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Suspense>
      <Environment background blur={0.75}>
        <color attach="background" args={['black']} />
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  )
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  // Refs for physics bodies
  const bandMeshRef = useRef<THREE.Mesh>(null); // Ref for the visual band mesh
  const fixedRef = useRef<RapierRigidBody>(null); // Fixed anchor point
  const joint1Ref = useRef<RapierRigidBody>(null); // First rope joint
  const joint2Ref = useRef<RapierRigidBody>(null); // Second rope joint
  const joint3Ref = useRef<RapierRigidBody>(null); // Third rope joint (connected to card)
  const cardRef = useRef<RapierRigidBody>(null); // The draggable card

  // Reusable THREE objects for calculations to avoid allocations in useFrame
  const dragTargetPosition = useMemo(() => new THREE.Vector3(), []); // Target position during drag
  const currentAngularVelocity = useMemo(() => new THREE.Vector3(), []); // To read current angular velocity
  const cardEulerRotation = useMemo(() => new THREE.Euler(), []); // To convert card quaternion to Euler
  const dragDirection = useMemo(() => new THREE.Vector3(), []); // Direction vector for drag projection

  // Physics properties for rope segments
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 2, linearDamping: 2 };

  // Constant for tilt correction factor
  const TILT_CORRECTION_FACTOR = 0.25;

  // Load assets (GLTF model and texture)
  // Using 'unknown' assertion as useGLTF's generic type doesn't perfectly match the generated structure without explicit tooling like gltf-tsx
  const { nodes, materials } = useGLTF('/models/tag.glb') as unknown as GLTFResult;
  const texture = useTexture('/models/band.png')
  const { width, height } = useThree((state) => state.size)
  const bandCurve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]), []);
  const [dragOffset, setDragOffset] = useState<THREE.Vector3 | null>(null); // Store the offset vector from click point to card center
  const [isHovered, setIsHovered] = useState(false);

  // Manually create geometry and material instances
  const lineGeo = useMemo(() => new MeshLineGeometry(), [])
  const lineMat = useMemo(() => new MeshLineMaterial({
    color: 'white',
    // depthTest: false, // Set this after creation
    resolution: new THREE.Vector2(width, height), // Use Vector2
    map: texture,
    useMap: 1, // Use 1 for true
    repeat: new THREE.Vector2(-3, 1), // Use Vector2
    lineWidth: 1
  }), [width, height, texture]) // Recreate material if dimensions or texture change

  useEffect(() => {
    if (lineMat) {
      lineMat.depthTest = false;
    }
  }, [lineMat]);

  // Refs are now correctly typed with useRef<RapierRigidBodyType>


  // Setup physics joints between segments
  // Casts are necessary here as the hook types might not perfectly align with useRef types
  useRopeJoint(fixedRef as React.RefObject<RapierRigidBody>, joint1Ref as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(joint1Ref as React.RefObject<RapierRigidBody>, joint2Ref as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(joint2Ref as React.RefObject<RapierRigidBody>, joint3Ref as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(joint3Ref as React.RefObject<RapierRigidBody>, cardRef as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    // Update cursor style based on hover and drag state
    if (isHovered) {
      document.body.style.cursor = dragOffset ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [isHovered, dragOffset]);

  // --- Helper function to handle drag updates ---
  const handleDrag = (state: import('@react-three/fiber').RootState) => {
    if (!dragOffset || !cardRef.current) return;

    // Project pointer position onto a plane at the card's approximate depth
    dragTargetPosition.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
    dragDirection.copy(dragTargetPosition).sub(state.camera.position).normalize();
    // Simplified projection: find point along ray from camera through pointer
    // at the same distance from the camera as the drag target initially was (implicitly)
    dragTargetPosition.add(dragDirection.multiplyScalar(state.camera.position.length()));

    // Wake up all bodies involved in the chain to ensure responsiveness
    [cardRef, joint1Ref, joint2Ref, joint3Ref, fixedRef].forEach((ref) => ref.current?.wakeUp());

    // Apply kinematic translation based on the calculated target position and initial offset
    cardRef.current.setNextKinematicTranslation({
      x: dragTargetPosition.x - dragOffset.x,
      y: dragTargetPosition.y - dragOffset.y,
      z: dragTargetPosition.z - dragOffset.z,
    });
  };

  // --- Helper function to update physics-based elements (lerping, band curve, tilt) ---
  const updatePhysicsAndBand = (delta: number) => {
    // Ensure all required refs are available
    const card = cardRef.current;
    const fixed = fixedRef.current;
    const j1 = joint1Ref.current as LerpableRigidBody | null; // Cast for potential lerped access
    const j2 = joint2Ref.current as LerpableRigidBody | null; // Cast for potential lerped access
    const j3 = joint3Ref.current;
    const bandMesh = bandMeshRef.current;

    if (!card || !fixed || !j1 || !j2 || !j3 || !bandMesh) return;

    // --- Lerp intermediate joints for smoother visual band (jitter reduction) ---
    [j1, j2].forEach((joint) => {
      // Initialize lerped position if it doesn't exist
      if (!joint.lerped) {
        joint.lerped = new THREE.Vector3().copy(joint.translation());
      }

      // Calculate lerp factor based on distance to reduce jitter when stretched
      const distance = joint.lerped.distanceTo(joint.translation());
      const clampedDistance = Math.max(0.1, Math.min(1, distance)); // Clamp distance for stability
      const lerpFactor = delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed));

      // Lerp the visual position towards the actual physics position
      joint.lerped.lerp(joint.translation(), lerpFactor);
    });

    // --- Update Band Curve ---
    // Get current positions (using lerped positions for intermediate joints)
    const p0 = j3.translation();
    const p1 = j2.lerped ?? j2.translation(); // Use lerped position if available
    const p2 = j1.lerped ?? j1.translation(); // Use lerped position if available
    const p3 = fixed.translation();

    // Update the points of the CatmullRomCurve3
    bandCurve.points[0].copy(p0);
    bandCurve.points[1].copy(p1);
    bandCurve.points[2].copy(p2);
    bandCurve.points[3].copy(p3);

    // Update the MeshLine geometry if it exists and is the correct type
    if (bandMesh.geometry instanceof MeshLineGeometry) {
      bandMesh.geometry.setPoints(bandCurve.getPoints(32)); // Update geometry with new curve points
    }

    // --- Card Tilt Correction ---
    // Apply a slight angular velocity to tilt the card back towards the screen
    currentAngularVelocity.copy(card.angvel()); // Get current angular velocity
    const cardRotation = card.rotation(); // Get current rotation quaternion {w, x, y, z}

    // Convert quaternion to Euler angles (using the pre-allocated Euler object)
    cardEulerRotation.setFromQuaternion(
      // Create a temporary Quaternion instance for the conversion
      // Note: Ideally, avoid allocation here if possible, but Quaternion constructor is needed
      new THREE.Quaternion(cardRotation.x, cardRotation.y, cardRotation.z, cardRotation.w),
      'XYZ' // Specify Euler order
    );

    // Apply corrective angular velocity on the Y-axis
    card.setAngvel(
      {
        x: currentAngularVelocity.x,
        y: currentAngularVelocity.y - cardEulerRotation.y * TILT_CORRECTION_FACTOR, // Apply correction based on Y rotation
        z: currentAngularVelocity.z,
      },
      true // Wake up the body
    );
  };


  // --- Main Frame Loop ---
  useFrame((state, delta) => {
    handleDrag(state);
    updatePhysicsAndBand(delta);
  });

  bandCurve.curveType = 'chordal'; // Use chordal curve type for smoother results
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Physics Bodies */}
        <RigidBody ref={fixedRef} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={joint1Ref} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={joint2Ref} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={joint3Ref} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={cardRef}
          {...segmentProps}
          type={dragOffset ? 'kinematicPosition' : 'dynamic'} // Switch to kinematic when dragged
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          {/* Visual representation of the card (Group for interaction) */}
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            onPointerUp={(e) => {
              // Check if target has releasePointerCapture method before calling
              if (typeof (e.target as Element)?.releasePointerCapture === 'function') {
                (e.target as Element).releasePointerCapture(e.pointerId);
              }
              setDragOffset(null); // End drag
            }}
            onPointerDown={(e: import('@react-three/fiber').ThreeEvent<PointerEvent>) => {
              if (!cardRef.current) return;
              e.stopPropagation(); // Prevent camera controls interference
              // Check if target has setPointerCapture method before calling
              if (typeof (e.target as Element)?.setPointerCapture === 'function') {
                (e.target as Element).setPointerCapture(e.pointerId);
              }
              // Calculate the offset from the click point to the card's center
              const currentCardPos = cardRef.current.translation();
              const offset = new THREE.Vector3().copy(e.point).sub(currentCardPos);
              setDragOffset(offset); // Start drag, storing the offset
            }}
          >
            {/* Use the typed nodes and materials directly */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      {/* Visual Band Mesh */}
      <mesh ref={bandMeshRef} geometry={lineGeo} material={lineMat} />
    </>
  )
}