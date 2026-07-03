'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppFlow } from '@/contexts/AppFlow';
import { PROVINCES } from '@/data/provinces';
import { Quiz } from '@/components/ui/Quiz';
import { motion } from 'framer-motion';

export function QuizActiveClient({ id }: { id: string }) {
  const router = useRouter();
  const { startQuiz } = useAppFlow();

  useEffect(() => {
    const normalizedId = id.replace(/_/g, '-');
    const province = PROVINCES.find(p => p.id === normalizedId);
    if (province) {
      if (id !== province.id) {
        router.replace(`/quiz/${province.id}`);
      } else {
        startQuiz(province, true);
      }
    } else {
      router.replace('/quiz');
    }
  }, [id, startQuiz, router]);

  return (
    <motion.div
      className="phase-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <Quiz visible={true} activeOnly={true} />
    </motion.div>
  );
}
