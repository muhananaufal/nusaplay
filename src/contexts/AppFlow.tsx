'use client';
import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const PHASES = {
  SPLASH: 'splash',
  JOURNEY: 'journey',
  MAP: 'map',
  PROVINCE: 'province',
  LIST: 'list',
  DETAIL: 'detail',
  STORYTELLING_END: 'storytelling_end',
  QUIZ: 'quiz',
} as const;

export type Phase = typeof PHASES[keyof typeof PHASES];

const AppFlowContext = createContext<any>({});
const ListUIContext = createContext<any>({});

export const useAppFlow = () => useContext(AppFlowContext);
export const useListUI = () => useContext(ListUIContext);

export const AppFlowProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>(PHASES.SPLASH);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedCulture, setSelectedCulture] = useState<any>(null);
  const [quizProvince, setQuizProvince] = useState<any>(null);
  const [visitedByProvince, setVisitedByProvince] = useState<Record<string, string[]>>({});
  const [listenedByProvince, setListenedByProvince] = useState<Record<string, string[]>>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState(['Semua']);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
      return () => clearTimeout(timer);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const resetListUI = useCallback(() => {
    setSearchQuery('');
    setActiveCategories(['Semua']);
    setCurrentPage(1);
    setTotalPages(1);
  }, []);

  // Delay actual route navigation by 500ms so the transition curtain fully covers screen first
  const triggerNavigation = useCallback((navAction: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navAction();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 550);
  }, []);

  const goTo = useCallback((nextPhase: Phase, skipPush: any = false) => {
    const doNav = () => {
      setPhase(nextPhase);
      if (skipPush !== true) {
        if (nextPhase === PHASES.SPLASH) router.push('/');
        else if (nextPhase === PHASES.JOURNEY) router.push('/journey');
        else if (nextPhase === PHASES.MAP) router.push('/map');
        else if (nextPhase === PHASES.QUIZ) {
          if (quizProvince) {
            router.push(`/quiz/${quizProvince.id}`);
          } else {
            router.push('/quiz');
          }
        }
        else if (nextPhase === PHASES.PROVINCE && selectedProvince) {
          router.push(`/province/${selectedProvince.id}`);
        }
        else if (nextPhase === PHASES.LIST && selectedProvince) {
          const cat = selectedCategory || 'Semua';
          if (cat === 'Semua') {
            router.push(`/province/${selectedProvince.id}/list`);
          } else {
            router.push(`/province/${selectedProvince.id}/list?category=${cat}`);
          }
        }
        else if (nextPhase === PHASES.DETAIL && selectedCulture) {
          router.push(`/culture/${selectedCulture.id}`);
        }
      }
    };
    
    const isBypassCurtain = 
      nextPhase === PHASES.MAP || 
      nextPhase === PHASES.JOURNEY ||
      (nextPhase === PHASES.PROVINCE && phase === PHASES.MAP);
    if (skipPush === true || isBypassCurtain) {
      doNav();
    } else {
      triggerNavigation(doNav);
    }
  }, [router, selectedProvince, selectedCategory, selectedCulture, quizProvince, triggerNavigation]);

  const selectProvince = useCallback((province: any, skipPush: any = false) => {
    const doNav = () => {
      setSelectedProvince(province);
      setSelectedCategory(null);
      setSelectedCulture(null);
      resetListUI();
      setPhase(PHASES.PROVINCE);
      if (skipPush !== true && province) {
        router.push(`/province/${province.id}`);
      }
    };
    
    // Always skip curtain wipe to allow smooth Leaflet zoom-in
    doNav();
  }, [resetListUI, router]);

  const selectCategory = useCallback((category: any, skipPush: any = false) => {
    const doNav = () => {
      setSelectedCategory(category);
      if (category === 'Semua') {
        setActiveCategories(['Semua']);
      } else {
        setActiveCategories([category]);
      }
      setSearchQuery('');
      setCurrentPage(1);
      setTotalPages(1);
      setPhase(PHASES.LIST);
      if (skipPush !== true && selectedProvince) {
        if (category === 'Semua') {
          router.push(`/province/${selectedProvince.id}/list`);
        } else {
          router.push(`/province/${selectedProvince.id}/list?category=${category}`);
        }
      }
    };
    
    if (skipPush === true) {
      doNav();
    } else {
      triggerNavigation(doNav);
    }
  }, [selectedProvince, router, triggerNavigation]);

  const selectCulture = useCallback((culture: any, skipPush: any = false) => {
    const doNav = () => {
      setSelectedCulture(culture);
      setPhase(PHASES.DETAIL);
      // Mark as visited under its provinceId (in-memory, no localStorage)
      if (culture?.id && culture?.provinceId) {
        setVisitedByProvince(prev => {
          const list = prev[culture.provinceId] || [];
          if (list.includes(culture.id)) return prev;
          return {
            ...prev,
            [culture.provinceId]: [...list, culture.id]
          };
        });
      }
      if (skipPush !== true && culture) {
        router.push(`/culture/${culture.id}`);
      }
    };
    
    if (skipPush === true) {
      doNav();
    } else {
      triggerNavigation(doNav);
    }
  }, [router, triggerNavigation]);

  const startQuiz = useCallback((province: any, skipPush: any = false) => {
    const doNav = () => {
      setQuizProvince(province);
      setPhase(PHASES.QUIZ);
      if (skipPush !== true) {
        if (province) {
          router.push(`/quiz/${province.id}`);
        } else {
          router.push('/quiz');
        }
      }
    };
    
    if (skipPush === true) {
      doNav();
    } else {
      triggerNavigation(doNav);
    }
  }, [router, triggerNavigation]);

  const markCultureListened = useCallback((id: string, provinceId: string) => {
    setListenedByProvince(prev => {
      const list = prev[provinceId] || [];
      if (list.includes(id)) return prev;
      return {
        ...prev,
        [provinceId]: [...list, id]
      };
    });
  }, []);

  const backToMap = useCallback((skipPush: any = false, useCurtain: boolean = false) => {
    const doNav = () => {
      setSelectedProvince(null);
      setSelectedCategory(null);
      setSelectedCulture(null);
      resetListUI();
      setPhase(PHASES.MAP);
      if (skipPush !== true) {
        router.push('/map');
      }
    };
    
    if (useCurtain) {
      triggerNavigation(doNav);
    } else {
      doNav();
    }
  }, [resetListUI, router, triggerNavigation]);

  const appFlowValue = useMemo(() => ({
    phase,
    goTo,
    selectedProvince,
    selectedCategory,
    selectedCulture,
    quizProvince,
    visitedByProvince,
    listenedByProvince,
    selectProvince,
    selectCategory,
    selectCulture,
    markCultureListened,
    startQuiz,
    backToMap,
    setPhase,
    setSelectedProvince,
    setSelectedCategory,
    setSelectedCulture,
    setQuizProvince,
    isTransitioning,
  }), [
    phase, selectedProvince, selectedCategory, selectedCulture, quizProvince, visitedByProvince, listenedByProvince, isTransitioning,
    goTo, selectProvince, selectCategory, selectCulture, markCultureListened, startQuiz, backToMap,
  ]);

  const listUIValue = useMemo(() => ({
    searchQuery, setSearchQuery,
    activeCategories, setActiveCategories,
    currentPage, setCurrentPage,
    totalPages, setTotalPages,
  }), [searchQuery, activeCategories, currentPage, totalPages]);

  return (
    <AppFlowContext.Provider value={appFlowValue}>
      <ListUIContext.Provider value={listUIValue}>
        {children}
      </ListUIContext.Provider>
    </AppFlowContext.Provider>
  );
};
