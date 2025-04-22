# Plan: Interactive 3D Badge Component

## Objective

Build a React component (`src/elements/BadgeComponent.tsx`) that renders an interactive 3D lanyard/badge model using React Three Fiber, Drei, and Rapier. Users should be able to click and drag the badge.

## Technology Stack

*   **Framework:** React (within Next.js)
*   **3D Library:** React Three Fiber (`@react-three/fiber`)
*   **Physics:** React Three Rapier (`@react-three/rapier`)
*   **Helpers:** Drei (`@react-three/drei`)

## Assumed Assets

*   **Model:** `/public/models/badge.glb`
*   **Texture:** `/public/textures/badge_texture.jpg` (Optional)

## Implementation Steps

```mermaid
graph TD
    subgraph Component Setup
        A[Create src/elements/BadgeComponent.tsx] --> B(Add 'use client' directive);
        B --> C(Import necessary hooks/components: React, useRef, useState, Canvas, useGLTF, Text, RigidBody, Physics, Colliders, Lights);
    end

    subgraph Scene Foundation
        D[Setup R3F <Canvas>] --> E(Add basic lighting: <ambientLight>, <directionalLight>);
        E --> F(Add <OrbitControls> for initial viewing/debugging - can be removed later);
        F --> G(Wrap scene elements in <Physics> component - mention optional gravity);
    end

    subgraph Badge Model & Physics
        H[Create BadgeModel sub-component] --> I(Inside BadgeModel: Load GLB using useGLTF - path: /models/badge.glb);
        I --> J(Apply basic <meshStandardMaterial>);
        J --> K(Show placeholder for texture application using useTexture - path: /textures/badge_texture.jpg);
        K --> L(Wrap model mesh in <RigidBody> ref={rigidBodyRef});
        L --> M(Add appropriate Collider, e.g., <CuboidCollider args={[...]} based on model size>);
    end

    subgraph Interaction Logic
        N[Inside BadgeModel: Implement Mouse Dragging] --> O(Use useRef for RigidBody);
        O --> P(Use useState to track drag state: isDragging);
        P --> Q(Implement onPointerDown: Capture pointer, set isDragging, create temporary joint/constraint attaching body to mouse);
        Q --> R(Implement onPointerMove: If dragging, update joint target based on mouse position);
        R --> S(Implement onPointerUp: Release pointer, remove joint, set isDragging false);
    end

    subgraph Optional Features & Integration
        T[Optional: Add <Text> component from Drei] --> U(Position text relative to the badge);
        U --> V[Add Code Comments explaining key parts, especially physics and interaction];
        V --> W[Provide Example: How to import and use <BadgeComponent /> in a Next.js page (e.g., src/app/badge-demo/page.tsx)];
    end

    C --> D;
    G --> H;
    M --> N;
    S --> T;
```

### Key Implementation Details:

1.  **File:** Create `src/elements/BadgeComponent.tsx`.
2.  **Structure:** Use `'use client';`. Import necessary modules from React, `@react-three/fiber`, `@react-three/drei`, and `@react-three/rapier`.
3.  **Scene:** Set up `<Canvas>` with `<ambientLight>`, `<directionalLight>`, and `<Physics>`.
4.  **Model (`BadgeModel` component):**
    *   Load `/models/badge.glb` (assuming it's in `/public/models/`) using `useGLTF`.
    *   Wrap the mesh in `<RigidBody ref={rigidBodyRef}>`.
    *   Add a `<CuboidCollider>` (or similar, based on the actual model shape) with appropriate `args`.
    *   Apply `<meshStandardMaterial>`. Include commented-out code showing how to apply a texture from `/textures/badge_texture.jpg` (assuming `/public/textures/`).
5.  **Interaction (within `BadgeModel`):**
    *   Use `useRef` for the `RigidBody`.
    *   Use `useState` for `isDragging`.
    *   Use pointer events (`onPointerDown`, `onPointerMove`, `onPointerUp`).
    *   On drag start (`onPointerDown`), create a constraint (like a `useSpringRef` joint or similar mechanism provided by Rapier/Drei helpers) to link the rigid body to the mouse position projected onto a plane.
    *   On drag move (`onPointerMove`), update the target of the constraint.
    *   On drag end (`onPointerUp`), remove the constraint, letting physics take over.
6.  **Optional Text:** Show how to use Drei's `<Text>` component, parented to the badge model.
7.  **Integration:** Provide a simple example of importing and rendering `<BadgeComponent />` in a Next.js page component.
8.  **Comments:** Add clear explanations throughout the code.