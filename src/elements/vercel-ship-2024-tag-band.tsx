import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo } from 'react' // Added useMemo
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
// Import Gltf type (corrected casing)
import { useGLTF, useTexture, Environment, Lightformer, Gltf } from '@react-three/drei' // Gltf is the component, type is inferred or defined below
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
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
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
  // Initialize band ref to point to the THREE.Mesh containing the MeshLine
  const band = useRef<THREE.Mesh>(null)
  // Use the imported RapierRigidBody type for refs
  const fixed = useRef<RapierRigidBody>(null)
  const j1 = useRef<RapierRigidBody>(null)
  const j2 = useRef<RapierRigidBody>(null)
  const j3 = useRef<RapierRigidBody>(null)
  const card = useRef<RapierRigidBody>(null)
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  // Use Euler for rotation conversion
  const euler = new THREE.Euler()
  const dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 2, linearDamping: 2 }
  // Use the defined GLTFResult type with unknown assertion
  const { nodes, materials } = useGLTF('/models/tag.glb') as unknown as GLTFResult
  const texture = useTexture('/models/band.png')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)

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

  // Set depthTest after material creation
  useEffect(() => {
    lineMat.depthTest = false;
  }, [lineMat]);

  // Refs are now correctly typed with useRef<RapierRigidBodyType>


  useRopeJoint(fixed as React.RefObject<RapierRigidBody>, j1 as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 0, 0], 1]) // Cast refs
  useRopeJoint(j1 as React.RefObject<RapierRigidBody>, j2 as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 0, 0], 1]) // Cast refs
  useRopeJoint(j2 as React.RefObject<RapierRigidBody>, j3 as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 0, 0], 1]) // Cast refs
  useSphericalJoint(j3 as React.RefObject<RapierRigidBody>, card as React.RefObject<RapierRigidBody>, [[0, 0, 0], [0, 1.45, 0]]) // Cast refs

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
        ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      // Ensure dragged is a Vector3 before accessing components
      if (dragged instanceof THREE.Vector3) {
        card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
      }
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      // Fix most of the jitter when over pulling the card
      ;[j1, j2].forEach((ref) => {
        // Use the augmented type LerpableRigidBody
        const currentRef = ref.current as LerpableRigidBody
        if (!currentRef) return;
        if (!currentRef.lerped) currentRef.lerped = new THREE.Vector3().copy(currentRef.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, currentRef.lerped.distanceTo(currentRef.translation())))
        currentRef.lerped.lerp(currentRef.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })

      // Calculate catmul curve points safely
      const p0 = j3.current.translation()
      // Use the augmented type and optional chaining safely
      const p1 = (j2.current as LerpableRigidBody)?.lerped ?? j2.current.translation()
      const p2 = (j1.current as LerpableRigidBody)?.lerped ?? j1.current.translation()
      const p3 = fixed.current.translation()


      curve.points[0].copy(p0)
      curve.points[1].copy(p1)
      curve.points[2].copy(p2)
      curve.points[3].copy(p3)

      // Check if band.current and its geometry exist, then cast geometry to MeshLineGeometry
      // Geometry is now directly the MeshLineGeometry instance
      if (band.current?.geometry instanceof MeshLineGeometry) {
        band.current.geometry.setPoints(curve.getPoints(32))
      }

      // Tilt it back towards the screen
      ang.copy(card.current.angvel())
      const cardRotation = card.current.rotation(); // This is { w, x, y, z }
      // Create a Quaternion instance from the rotation object
      const quat = new THREE.Quaternion(cardRotation.x, cardRotation.y, cardRotation.z, cardRotation.w);
      // Use Euler instance for conversion from the Quaternion
      euler.setFromQuaternion(quat, 'XYZ'); // Use appropriate Euler order
      card.current.setAngvel({ x: ang.x, y: ang.y - euler.y * 0.25, z: ang.z }, true)
    }
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId)
              drag(false)
            }}
            // Add type assertion for the event from R3F pointer events
            onPointerDown={(e: import('@react-three/fiber').ThreeEvent<PointerEvent>) => {
              if (!card.current) return;
              // Stop propagation to prevent other event listeners (like camera controls)
              e.stopPropagation();
              (e.target as HTMLElement).setPointerCapture(e.pointerId)
              const currentCardPos = card.current.translation();
              // e.point is already a Vector3 in R3F events
              const offset = new THREE.Vector3().copy(e.point).sub(currentCardPos);
              drag(offset); // Store the offset vector
            }}>
            {/* Use the typed nodes and materials directly */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      {/* Ref points to the mesh */}
      {/* Pass manually created geometry and material */}
      <mesh ref={band} geometry={lineGeo} material={lineMat} />
    </>
  )
}