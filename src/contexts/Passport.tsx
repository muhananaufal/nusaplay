'use client';
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useAppFlow } from '@/contexts/AppFlow';
import { UNLOCKED_PROVINCES } from '@/data/provinces';
import { getCulturesByProvince } from '@/data/cultures';

export interface AchievementItem {
  key: string;
  title: string;
  desc: string;
  icon: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    key: 'first_audio',
    title: 'Pendengar Mula',
    desc: 'Mendengarkan kisah budaya pertama kali dari Nusa.',
    icon: '🎧',
  },
  {
    key: 'first_quiz',
    title: 'Uji Wawasan',
    desc: 'Menyelesaikan kuis provinsi untuk pertama kalinya.',
    icon: '📝',
  },
  // Cendekia Sempurna (Perfect Quiz Score) split per province
  {
    key: 'perfect_quiz_jawa-tengah',
    title: 'Cendekia Sempurna Jawa Tengah',
    desc: 'Menjawab seluruh pertanyaan kuis Jawa Tengah dengan benar (skor 100%).',
    icon: '💯',
  },
  {
    key: 'perfect_quiz_diy',
    title: 'Cendekia Sempurna DIY',
    desc: 'Menjawab seluruh pertanyaan kuis D.I. Yogyakarta dengan benar (skor 100%).',
    icon: '💯',
  },
  {
    key: 'perfect_quiz_kalimantan-barat',
    title: 'Cendekia Sempurna Kalimantan Barat',
    desc: 'Menjawab seluruh pertanyaan kuis Kalimantan Barat dengan benar (skor 100%).',
    icon: '💯',
  },
  {
    key: 'perfect_quiz_papua',
    title: 'Cendekia Sempurna Papua',
    desc: 'Menjawab seluruh pertanyaan kuis Papua dengan benar (skor 100%).',
    icon: '💯',
  },
  // Penjelajah Daerah (Explore all cultures) split per province
  {
    key: 'explore_province_jawa-tengah',
    title: 'Penjelajah Daerah Jawa Tengah',
    desc: 'Membuka seluruh detail kebudayaan di provinsi Jawa Tengah.',
    icon: '🧭',
  },
  {
    key: 'explore_province_diy',
    title: 'Penjelajah Daerah DIY',
    desc: 'Membuka seluruh detail kebudayaan di provinsi D.I. Yogyakarta.',
    icon: '🧭',
  },
  {
    key: 'explore_province_kalimantan-barat',
    title: 'Penjelajah Daerah Kalimantan Barat',
    desc: 'Membuka seluruh detail kebudayaan di provinsi Kalimantan Barat.',
    icon: '🧭',
  },
  {
    key: 'explore_province_papua',
    title: 'Penjelajah Daerah Papua',
    desc: 'Membuka seluruh detail kebudayaan di provinsi Papua.',
    icon: '🧭',
  },
  // Kolektor Suara (Listen to all audios) split per province
  {
    key: 'listen_province_jawa-tengah',
    title: 'Kolektor Suara Jawa Tengah',
    desc: 'Mendengarkan seluruh kisah audio kebudayaan di provinsi Jawa Tengah.',
    icon: '🔊',
  },
  {
    key: 'listen_province_diy',
    title: 'Kolektor Suara DIY',
    desc: 'Mendengarkan seluruh kisah audio kebudayaan di provinsi D.I. Yogyakarta.',
    icon: '🔊',
  },
  {
    key: 'listen_province_kalimantan-barat',
    title: 'Kolektor Suara Kalimantan Barat',
    desc: 'Mendengarkan seluruh kisah audio kebudayaan di provinsi Kalimantan Barat.',
    icon: '🔊',
  },
  {
    key: 'listen_province_papua',
    title: 'Kolektor Suara Papua',
    desc: 'Mendengarkan seluruh kisah audio kebudayaan di provinsi Papua.',
    icon: '🔊',
  },
  {
    key: 'explore_indonesia',
    title: 'Ksatria Nusantara',
    desc: 'Membuka seluruh detail kebudayaan aktif di peta Nusantara.',
    icon: '🛡️',
  },
  {
    key: 'listen_indonesia',
    title: 'Empu Nusantara',
    desc: 'Mendengarkan seluruh kisah audio budaya aktif di peta Nusantara.',
    icon: '👑',
  },
];

interface PassportCtx {
  // Backward compatibility
  visitedProvinces: Set<string>;
  completedQuizzes: Set<string>;
  perfectQuizzes: Set<string>;
  stampProvince: (provinceId: string) => void;
  completeQuiz: (provinceId: string, score: number, total: number) => void;
  dismissStamp: () => void;
  visitCount: number;
  newStamp: string | null;

  // Best quiz scores per province (in-memory, no localStorage)
  bestScores: Record<string, number>; // provinceId → best score (0–total questions)
  bestScoreTotals: Record<string, number>; // provinceId → total questions at time of best

  // New Achievement system (No localStorage, in-memory only)
  unlockedAchievements: Set<string>;
  newAchievement: string | null;
  dismissAchievement: () => void;
}

const PassportContext = createContext<PassportCtx>({
  visitedProvinces: new Set(),
  completedQuizzes: new Set(),
  perfectQuizzes: new Set(),
  stampProvince: () => {},
  completeQuiz: () => {},
  dismissStamp: () => {},
  visitCount: 0,
  newStamp: null,
  bestScores: {},
  bestScoreTotals: {},
  unlockedAchievements: new Set(),
  newAchievement: null,
  dismissAchievement: () => {},
});

export const usePassport = () => useContext(PassportContext);
export const useAchievement = () => useContext(PassportContext);

export const PassportProvider = ({ children }: { children: React.ReactNode }) => {
  const { visitedByProvince, listenedByProvince } = useAppFlow();

  const [visitedProvinces, setVisitedProvinces] = useState<Set<string>>(new Set());
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const [perfectQuizzes, setPerfectQuizzes] = useState<Set<string>>(new Set());
  const [newStamp, setNewStamp] = useState<string | null>(null);

  // Best scores per province (in-memory)
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const [bestScoreTotals, setBestScoreTotals] = useState<Record<string, number>>({});

  // Achievement states
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [achievementQueue, setAchievementQueue] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  // Stamp a province (legacy support)
  const stampProvince = useCallback((provinceId: string) => {
    setVisitedProvinces(prev => {
      if (prev.has(provinceId)) return prev;
      const next = new Set(prev);
      next.add(provinceId);
      return next;
    });
  }, []);

  const dismissStamp = useCallback(() => {
    setNewStamp(null);
  }, []);

  // Unlock helper
  const unlock = useCallback((key: string) => {
    setUnlockedAchievements(prev => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      setAchievementQueue(q => {
        if (q.includes(key)) return q;
        return [...q, key];
      });
      return next;
    });
  }, []);

  // Complete a quiz
  const completeQuiz = useCallback((provinceId: string, score: number, total: number) => {
    const isPerfect = score === total;

    // Always track best score
    setBestScores(prev => {
      const current = prev[provinceId] ?? -1;
      if (score <= current) return prev;
      return { ...prev, [provinceId]: score };
    });
    setBestScoreTotals(prev => ({ ...prev, [provinceId]: total }));

    setCompletedQuizzes(prev => {
      const next = new Set(prev);
      next.add(provinceId);
      return next;
    });

    if (isPerfect) {
      setPerfectQuizzes(prev => {
        if (prev.has(provinceId)) return prev;
        const next = new Set(prev);
        next.add(provinceId);
        return next;
      });
    }

    // Trigger quiz-based achievements
    unlock('first_quiz');
    if (isPerfect) {
      unlock(`perfect_quiz_${provinceId}`);
    }
  }, [unlock]);

  const dismissAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  // Process the queue of newly unlocked achievements
  useEffect(() => {
    if (!newAchievement && achievementQueue.length > 0) {
      const nextAcc = achievementQueue[0];
      setNewAchievement(nextAcc);
      setAchievementQueue(q => q.slice(1));
    }
  }, [achievementQueue, newAchievement]);

  // Monitor AppFlow visited/listened cultures to unlock progress achievements
  useEffect(() => {
    // 1. Pendengar Mula (first_audio)
    let totalListened = 0;
    Object.values(listenedByProvince as Record<string, string[]> || {}).forEach(list => {
      totalListened += list.length;
    });
    if (totalListened >= 1) {
      unlock('first_audio');
    }

    // Pre-calculate total active cultures per province
    const provinceCultureTotals = UNLOCKED_PROVINCES.map(p => ({
      id: p.id,
      total: getCulturesByProvince(p.id).length
    }));

    // 2. Penjelajah Daerah (explore_province) per province
    provinceCultureTotals.forEach(p => {
      const visitedCount = visitedByProvince[p.id]?.length || 0;
      if (p.total > 0 && visitedCount === p.total) {
        unlock(`explore_province_${p.id}`);
      }
    });

    // 3. Kolektor Suara (listen_province) per province
    provinceCultureTotals.forEach(p => {
      const listenedCount = listenedByProvince[p.id]?.length || 0;
      if (p.total > 0 && listenedCount === p.total) {
        unlock(`listen_province_${p.id}`);
      }
    });

    // Total cultures across all unlocked provinces
    const totalActiveCultures = provinceCultureTotals.reduce((sum, p) => sum + p.total, 0);

    // Total visited cultures across all unlocked provinces
    let totalVisited = 0;
    Object.values(visitedByProvince as Record<string, string[]> || {}).forEach(list => {
      totalVisited += list.length;
    });

    // 4. Ksatria Nusantara (explore_indonesia)
    if (totalActiveCultures > 0 && totalVisited === totalActiveCultures) {
      unlock('explore_indonesia');
    }

    // 5. Empu Nusantara (listen_indonesia)
    if (totalActiveCultures > 0 && totalListened === totalActiveCultures) {
      unlock('listen_indonesia');
    }
  }, [visitedByProvince, listenedByProvince, unlock]);

  // Legacy stamp sync when a province's audios are fully completed
  useEffect(() => {
    UNLOCKED_PROVINCES.forEach(p => {
      const total = getCulturesByProvince(p.id).length;
      const listenedCount = listenedByProvince[p.id]?.length || 0;
      if (total > 0 && listenedCount === total) {
        stampProvince(p.id);
      }
    });
  }, [listenedByProvince, stampProvince]);

  const value = useMemo(() => ({
    visitedProvinces,
    completedQuizzes,
    perfectQuizzes,
    stampProvince,
    completeQuiz,
    dismissStamp,
    visitCount: visitedProvinces.size,
    newStamp,
    bestScores,
    bestScoreTotals,
    unlockedAchievements,
    newAchievement,
    dismissAchievement,
  }), [
    visitedProvinces,
    completedQuizzes,
    perfectQuizzes,
    stampProvince,
    completeQuiz,
    dismissStamp,
    newStamp,
    bestScores,
    bestScoreTotals,
    unlockedAchievements,
    newAchievement,
    dismissAchievement,
  ]);

  return (
    <PassportContext.Provider value={value as any}>
      {children}
    </PassportContext.Provider>
  );
};
