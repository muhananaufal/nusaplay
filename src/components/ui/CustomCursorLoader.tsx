'use client';
import dynamic from 'next/dynamic';

// Dynamic import lives inside a Client Component — the only place ssr:false is allowed.
// This keeps CustomCursor (+ its GSAP dep) out of the initial server-side bundle.
const CustomCursorLazy = dynamic(
  () => import('@/components/ui/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
);

export function CustomCursorLoader() {
  return <CustomCursorLazy />;
}
