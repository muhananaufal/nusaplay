'use client';
import dynamic from 'next/dynamic';

// Dynamic import lives inside a Client Component — the only place ssr:false is allowed.
// This keeps NewStampCelebration (+ its Framer Motion dep) out of the initial bundle.
const NewStampCelebrationLazy = dynamic(
  () => import('@/components/ui/NewStampCelebration').then(m => ({ default: m.NewStampCelebration })),
  { ssr: false }
);

export function NewStampCelebrationLoader() {
  return <NewStampCelebrationLazy />;
}
