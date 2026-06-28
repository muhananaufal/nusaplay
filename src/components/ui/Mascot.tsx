'use client';

export type MascotPose = 'idle' | 'excited' | 'thinking' | 'sad';

const POSE_SHEETS: Record<MascotPose, string> = {
  idle: '/images/mascot/idle_sheet.png',
  excited: '/images/mascot/excited_sheet.png',
  thinking: '/images/mascot/thinking_sheet.png',
  sad: '/images/mascot/sad_sheet.png',
};

interface MascotProps {
  pose?: MascotPose;
  className?: string;
  size?: number;
}

export function Mascot({ pose = 'idle', className = '', size = 120 }: MascotProps) {
  return (
    <div 
      className={`mascot-sprite-body ${pose} ${className}`}
      style={{
        backgroundImage: `url(${POSE_SHEETS[pose]})`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
