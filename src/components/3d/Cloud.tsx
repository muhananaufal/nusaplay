'use client';
import * as THREE from "three";

// Shared geometry and material across all instances
export const sphereGeom = new THREE.SphereGeometry(0.5, 8, 8);
export const cloudMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  transparent: true,
  opacity: 0,
  depthWrite: false,
});

export const Cloud = (props: any) => {
  const cloudGeoms = [
    { pos: [-0.3, 0, 0],    scale: [1.2, 1, 1]  },
    { pos: [0.1, 0.3, 0],   scale: [1.2, 1.5, 1] },
    { pos: [0.4, 0, 0],     scale: [1.2, 1, 1]  },
    { pos: [0, -0.2, 0.2],  scale: [0.8, 0.8, 1.5] },
  ];

  return (
    <group {...props}>
      {cloudGeoms.map(({ pos, scale }, i) => (
        <mesh 
          key={i} 
          position={pos as any} 
          scale={scale as any} 
          geometry={sphereGeom} 
          material={cloudMaterial} 
        />
      ))}
    </group>
  );
};
