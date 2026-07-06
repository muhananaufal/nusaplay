'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppFlow } from '@/contexts/AppFlow';
import { fetchCultureById } from '@/utils/fetchCultures';
import { PROVINCES } from '@/data/provinces';
import { CultureDetail } from '@/components/ui/CultureDetail';
import { motion } from 'framer-motion';

export function CultureDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { selectCulture, setSelectedProvince } = useAppFlow();

  useEffect(() => {
    fetchCultureById(id).then((culture) => {
      if (culture) {
        const province = PROVINCES.find(p => p.id === culture.provinceId);
        if (province) setSelectedProvince(province);
        selectCulture(culture, true);
      } else {
        router.replace('/map');
      }
    });
  }, [id, selectCulture, setSelectedProvince, router]);

  return (
    <motion.div
      className="phase-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <CultureDetail visible={true} />
    </motion.div>
  );
}
