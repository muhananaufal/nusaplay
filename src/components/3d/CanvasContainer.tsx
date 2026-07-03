'use client';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Experience } from './Experience';
import { isWebGLAvailable } from '@/utils/webgl';
import { usePlay } from '@/contexts/Play';

export const CanvasContainer = ({ active }: { active: boolean }) => {
  const { play } = usePlay();
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(isWebGLAvailable());
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#0D1B2A', fontSize: '14px', fontFamily: 'monospace' }}>
          WebGL not supported. Skipping 3D intro...
        </p>
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#0D1B2A', fontSize: '14px', fontFamily: 'monospace' }}>
          WebGL not supported. Skipping 3D intro...
        </p>
      </div>
    );
  }

  return (
    <Canvas
      frameloop={play ? 'always' : 'demand'}
      // ── Performance: cap pixel ratio so high-DPI screens don't render 4× the pixels ──
      dpr={[1, 1.5]}
      // ── Power preference: request the discrete GPU on laptops with dual GPUs ──────
      gl={{
        powerPreference: 'high-performance',
        // antialias: false → let SSAA/MSAA from postprocessing handle it instead
        antialias: false,
        // Disable depth testing for 2D overlays — not needed for the skybox
        stencil: false,
      }}
      // ── No tone-mapping overhead; the scene uses its own colour management ──────────
      flat
    >
      <color attach="background" args={['#F2F2F2']} />
      {active && (
        <ScrollControls pages={0} damping={0.5}>
          <Experience />
        </ScrollControls>
      )}
    </Canvas>
  );
};
