'use client';
import { useEffect } from 'react';
import { useAppFlow } from '@/contexts/AppFlow';
import { Quiz } from '@/components/ui/Quiz';
import { motion } from 'framer-motion';

export function QuizPageClient() {
  const { startQuiz } = useAppFlow();

  useEffect(() => {
    startQuiz(null, true);
  }, [startQuiz]);

  return (
    <motion.div
      className="phase-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <Quiz visible={true} selectionOnly={true} />
    </motion.div>
  );
}
