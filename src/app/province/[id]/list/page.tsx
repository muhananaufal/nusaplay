'use client';
import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAppFlow } from '@/contexts/AppFlow';
import { PROVINCES } from '@/data/provinces';
import { CultureList } from '@/components/ui/CultureList';
import { motion } from 'framer-motion';

export default function ProvinceListPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedProvince, selectedCategory, selectProvince, selectCategory } = useAppFlow();

  useEffect(() => {
    if (!id) return;
    const pId = typeof id === 'string' ? id : id[0];
    const province = PROVINCES.find(p => p.id === pId);
    if (province) {
      const category = searchParams.get('category') || 'Semua';
      
      // Only select if different to prevent infinite reset loops
      if (selectedProvince?.id !== province.id) {
        selectProvince(province, true);
      }
      if (selectedCategory !== category) {
        selectCategory(category, true);
      }
    } else {
      router.replace('/map');
    }
  }, [id, searchParams, selectedProvince, selectedCategory, selectProvince, selectCategory, router]);

  return (
    <motion.div
      className="phase-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <CultureList visible={true} />
    </motion.div>
  );
}
