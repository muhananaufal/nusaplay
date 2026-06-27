'use client';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

// ── Performance note ──────────────────────────────────────────────────────────
// The original MeshDistortMaterial from @react-three/drei runs a GLSL distortion
// shader every frame, which is expensive on the GPU for what is effectively just
// a sky-dome that slowly changes colour. Replaced with plain meshStandardMaterial
// that only mutates its color uniform — much cheaper shader path.
export const Background = ({ backgroundColors }: { backgroundColors: any }) => {
  const material = useRef<any>(null);
  const colorA = useRef(new Color(backgroundColors.current.colorA));

  useFrame(() => {
    colorA.current.set(backgroundColors.current.colorA);
    if (material.current) {
      material.current.color = colorA.current;
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[30, 8, 8]} />
      <meshStandardMaterial
        ref={material}
        color={backgroundColors.current.colorA}
        side={1}
        roughness={1}
        metalness={0}
        envMapIntensity={0}
      />
    </mesh>
  );
};
