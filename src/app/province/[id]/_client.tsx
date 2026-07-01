'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppFlow } from '@/contexts/AppFlow';
import { PROVINCES } from '@/data/provinces';
import { ProvinceDestinations } from '@/components/ui/ProvinceDestinations';
import { motion } from 'framer-motion';

export function ProvincePageClient({ id }: { id: string }) {
  const router = useRouter();
  const { selectProvince } = useAppFlow();

  useEffect(() => {
    const normalizedId = id.replace(/_/g, '-');
    const province = PROVINCES.find(p => p.id === normalizedId);
    if (province) {
      if (id !== province.id) {
        router.replace(`/province/${province.id}`);
      } else {
        selectProvince(province, true);
      }
    } else {
      router.replace('/map');
    }
  }, [id, selectProvince, router]);

  return (
    <motion.div
      className="phase-layer"
      style={{ background: 'transparent', pointerEvents: 'all' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProvinceDestinations visible={true} />
    </motion.div>
  );
}
