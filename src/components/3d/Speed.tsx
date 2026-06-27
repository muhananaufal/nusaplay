'use client';
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { usePlay } from "@/contexts/Play";
import * as THREE from "three";

const AMOUNT = 50;

export const Speed = () => {
  const { play, end } = usePlay();
  const meshRef = useRef<any>(null);

  const streaks = useRef(
    Array.from({ length: AMOUNT }, () => ({
      position: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(4),
        THREE.MathUtils.randFloat(-15, 0)
      ),
      speed: THREE.MathUtils.randFloat(0.05, 0.15),
    }))
  );

  const tempObject = useRef(new THREE.Object3D());

  useEffect(() => {
    if (!meshRef.current) return;
    streaks.current.forEach((streak, i) => {
      tempObject.current.position.copy(streak.position);
      tempObject.current.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.current.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    if (!play || end || !meshRef.current) return;

    streaks.current.forEach((streak, i) => {
      streak.position.z += streak.speed;
      if (streak.position.z > 2) {
        streak.position.z = THREE.MathUtils.randFloat(-20, -10);
        streak.position.x = THREE.MathUtils.randFloatSpread(10);
        streak.position.y = THREE.MathUtils.randFloatSpread(4);
      }

      tempObject.current.position.copy(streak.position);
      tempObject.current.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.current.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, AMOUNT]}>
      <boxGeometry args={[0.005, 0.005, 0.2]} />
      <meshBasicMaterial color="white" transparent opacity={0.5} />
    </instancedMesh>
  );
};
