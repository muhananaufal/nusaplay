// Simplified fade material - no custom shader injection
// Uses standard opacity instead of shader-based z-fade to avoid Three.js version conflicts

export const fadeOnBeforeCompile = () => {
  // No-op: we use standard opacity instead of custom shader fade
};
