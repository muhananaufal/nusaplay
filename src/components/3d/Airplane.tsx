'use client';
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const HELIX_SPEED = 6;

export const Airplane = (props: any) => {
  const { nodes, materials } = useGLTF("/models/airplane.glb") as any;
  const helix = useRef<any>(null);

  useFrame((_state, delta) => {
    if (helix.current) {
      helix.current.rotation.x += delta * HELIX_SPEED;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.PUSHILIN_Plane_Circle000.geometry}>
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh
        ref={helix}
        geometry={nodes.PUSHILIN_Plane_Helix.geometry}
        material={materials.plane}
        position={[1.09, 0.23, 0]}
      >
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/airplane.glb");
