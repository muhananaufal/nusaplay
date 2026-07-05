'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePlay } from '@/contexts/Play';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';

type PoseType = 'idle' | 'excited' | 'thinking' | 'sad';

export function MascotAssistant() {
  const { phase } = useAppFlow();
  const { tourActive, journeyCompleted } = usePlay();
  const pathname = usePathname();
  const [pose, setPose] = useState<PoseType>('idle');
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSplashOrJourney = phase === PHASES.SPLASH || phase === PHASES.JOURNEY;
  const isQuizResults = journeyCompleted && pathname?.includes('/quiz');
  const isDetail = pathname?.includes('/culture');
  const shouldHide = !mounted || tourActive || isQuizResults || isSplashOrJourney || isDetail;

  // Listen to Quiz custom events to react visually
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const triggerPose = (newPose: PoseType, duration: number) => {
      if (timeoutId) clearTimeout(timeoutId);
      setPose(newPose);
      timeoutId = setTimeout(() => {
        setPose('idle');
      }, duration);
    };

    const handleQuizCorrect = () => triggerPose('excited', 3500);
    const handleQuizIncorrect = () => triggerPose('sad', 4500);
    const handleQuizComplete = () => triggerPose('excited', 6000);

    window.addEventListener('nusaplay:quizCorrect', handleQuizCorrect);
    window.addEventListener('nusaplay:quizIncorrect', handleQuizIncorrect);
    window.addEventListener('nusaplay:quizComplete', handleQuizComplete);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('nusaplay:quizCorrect', handleQuizCorrect);
      window.removeEventListener('nusaplay:quizIncorrect', handleQuizIncorrect);
      window.removeEventListener('nusaplay:quizComplete', handleQuizComplete);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div ref={constraintsRef} className="mascot-root">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        dragMomentum={false}
        className="mascot-container"
        initial={{ scale: 0, opacity: 0, pointerEvents: 'none' }}
        animate={shouldHide ? {
          scale: 0,
          opacity: 0,
          pointerEvents: 'none'
        } : {
          scale: 1,
          opacity: 1,
          pointerEvents: 'auto'
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
        }}
      >
        <div className="mascot-click-target">
          <video 
            src="/mascot/maskot.webm"
            autoPlay
            loop
            muted
            playsInline
            className={`mascot-sprite-body ${pose}`}
          />
        </div>
      </motion.div>
    </div>
  );
}
