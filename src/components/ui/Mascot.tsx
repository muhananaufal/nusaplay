'use client';

export type MascotPose = 'idle' | 'excited' | 'thinking' | 'sad';

interface MascotProps {
  pose?: MascotPose;
  className?: string;
  size?: number;
}

export function Mascot({ pose = 'idle', className = '', size = 160 }: MascotProps) {
  return (
    <video
      src="/mascot/maskot.webm"
      autoPlay
      loop
      muted
      playsInline
      className={`mascot-sprite-body ${pose} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        mixBlendMode: 'screen',
        objectFit: 'contain',
      }}
    />
  );
}

