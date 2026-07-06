'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchQuizByProvince } from '@/utils/fetchCultures';
import { useAppFlow } from '@/contexts/AppFlow';
import { usePlay } from '@/contexts/Play';
import { UNLOCKED_PROVINCES } from '@/data/provinces';
import { Mascot } from './Mascot';
import { usePassport } from '@/contexts/Passport';
import { SearchIcon } from './PremiumIcons';
import '@/app/quiz/quiz.css';

// Synthesized sound effects using native Web Audio API
const playCorrectSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const playNote = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };
    const now = ctx.currentTime;
    playNote(523.25, now, 0.12); // C5
    playNote(783.99, now + 0.08, 0.22); // G5
  } catch (e) {
    console.warn('Web Audio not supported', e);
  }
};

const playIncorrectSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const playTone = (freq1: number, freq2: number, start: number, duration: number) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq1, start);
      osc2.frequency.setValueAtTime(freq2, start);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, start); // Smooth out the sawtooth harshness
      
      gain.gain.setValueAtTime(0.22, start); // Clear, loud gain
      gain.gain.linearRampToValueAtTime(0.001, start + duration);
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start(start);
      osc2.start(start);
      osc1.stop(start + duration);
      osc2.stop(start + duration);
    };
    
    const now = ctx.currentTime;
    // Play two quick discordant buzzy notes in sequence (bomp-bomp)
    playTone(293.66, 300.0, now, 0.18); // Note 1: Out-of-tune D4
    playTone(220.00, 225.0, now + 0.1, 0.28); // Note 2: Out-of-tune A3
  } catch (e) {
    console.warn('Web Audio not supported', e);
  }
};

const playSuccessSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const playNote = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.1, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };
    const now = ctx.currentTime;
    playNote(261.63, now, 0.15); // C4
    playNote(329.63, now + 0.08, 0.15); // E4
    playNote(392.00, now + 0.16, 0.15); // G4
    playNote(523.25, now + 0.24, 0.4); // C5
  } catch (e) {
    console.warn('Web Audio not supported', e);
  }
};

// Pre-computed at module load time — Math.random() in JSX causes different
// positions on every render and makes confetti jump unpredictably if the
// parent re-renders while confetti is visible.
const CONFETTI_ITEMS = Array.from({ length: 40 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 0.6}s`,
  color: ['#ffad30', '#55ab8f', '#6f35cc', '#c0392b', '#9cd5f3', '#f4c38a'][i % 6],
  size: `${Math.random() * 8 + 6}px`,
  rotate: Math.random() * 360,
}));

const Confetti = () => (
  <div className="confetti-container">
    {CONFETTI_ITEMS.map((item, i) => (
      <div
        key={i}
        className="confetti-piece"
        style={{
          left: item.left,
          animationDelay: item.delay,
          background: item.color,
          width: item.size,
          height: item.size,
          transform: `rotate(${item.rotate}deg)`,
        }}
      />
    ))}
  </div>
);

// ── Circular Arc Timer ────────────────────────────────────────────────────
const TIMER_SECONDS = 15;
const CircularTimer = ({ onExpire, active }: { onExpire: () => void; active: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const circumference = 2 * Math.PI * 22; // r=22
  const progress = timeLeft / TIMER_SECONDS;
  const dashOffset = circumference * (1 - progress);

  useEffect(() => {
    if (!active) { setTimeLeft(TIMER_SECONDS); return; }
    if (timeLeft <= 0) { onExpire(); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, active, onExpire]);

  // Reset when active changes
  useEffect(() => { if (active) setTimeLeft(TIMER_SECONDS); }, [active]);

  const color = timeLeft > 8 ? '#55ab8f' : timeLeft > 4 ? '#ffad30' : '#c0392b';

  return (
    <div className="quiz-timer">
      <svg width="54" height="54" viewBox="0 0 54 54">
        {/* Background ring */}
        <circle cx="27" cy="27" r="22" fill="none" stroke="rgba(85,145,185,0.12)" strokeWidth="3" />
        {/* Progress ring */}
        <circle
          cx="27" cy="27" r="22"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 27 27)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
      <span className="quiz-timer-num" style={{ color }}>{timeLeft}</span>
    </div>
  );
};

// ── Floating score pop ────────────────────────────────────────────────────
const FloatingScore = ({ show, points }: { show: boolean; points: number }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="quiz-score-pop"
        initial={{ opacity: 1, y: 0, scale: 0.8 }}
        animate={{ opacity: 0, y: -60, scale: 1.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        +{points} ✈
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Grade logic ───────────────────────────────────────────────────────────
const getGrade = (score: number, total: number) => {
  const pct = score / total;
  if (pct === 1) return { grade: 'S', label: 'SEMPURNA!', color: '#ffad30', desc: 'Kamu maestro budaya Nusantara!' };
  if (pct >= 0.8) return { grade: 'A', label: 'LUAR BIASA', color: '#55ab8f', desc: 'Pengetahuan budayamu sangat kuat.' };
  if (pct >= 0.6) return { grade: 'B', label: 'BAGUS', color: '#9cd5f3', desc: 'Masih ada yang bisa dipelajari!' };
  return { grade: 'C', label: 'TERUS BELAJAR', color: '#c0392b', desc: 'Jelajahi lebih banyak budaya Nusantara.' };
};

export const Quiz = ({ visible, selectionOnly = false, activeOnly = false }: { visible: boolean; selectionOnly?: boolean; activeOnly?: boolean }) => {
  const { quizProvince, startQuiz, backToMap } = useAppFlow();
  const { setJourneyCompleted } = usePlay();
  const { completeQuiz, completedQuizzes, visitedProvinces, bestScores, bestScoreTotals } = usePassport();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lockedProvData, setLockedProvData] = useState<any | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0); // always reflects latest score, avoids stale closure
  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null); // snapshot taken when quiz ends
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScorePop, setShowScorePop] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pool, setPool] = useState<any[]>([]);

  useEffect(() => {
    if (!quizProvince?.id) {
      setPool([]);
      return;
    }
    fetchQuizByProvince(quizProvince.id).then(setPool);
  }, [quizProvince?.id]);

  // Reset search query when visible state changes or province is chosen
  useEffect(() => {
    if (!visible || quizProvince) {
      setSearchQuery('');
    }
  }, [visible, quizProvince]);

  const filteredProvinces = useMemo(() => {
    if (!searchQuery.trim()) return UNLOCKED_PROVINCES;
    const q = searchQuery.toLowerCase().trim();
    return UNLOCKED_PROVINCES.filter(prov => 
      prov.name.toLowerCase().includes(q) || 
      (prov.tagline && prov.tagline.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // When quiz finishes, record the finalScore snapshot into passport (fires AFTER score state settles)
  useEffect(() => {
    if (done && finalScore !== null && quizProvince) {
      completeQuiz(quizProvince.id, finalScore, questions.length);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, finalScore]);

  // Reset quiz states whenever selected province changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    scoreRef.current = 0;
    setFinalScore(null);
    setDone(false);
    setShowConfetti(false);
    setShakeWrong(false);
    setTimerActive(true);
  }, [quizProvince?.id]);

  // Activate timer when quiz starts
  useEffect(() => {
    if (visible && quizProvince) setTimerActive(true);
  }, [visible, quizProvince]);

  const questions = useMemo(() => {
    if (!quizProvince || pool.length === 0) return [];
    
    // 2. Clone and shuffle the pool
    const shuffledPool = [...pool];
    for (let i = shuffledPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
    }
    
    // 3. Take exactly 5 questions
    const selectedQuestions = shuffledPool.slice(0, 5);
    
    // 4. Randomize the choices for each selected question
    return selectedQuestions.map(q => {
      const correctOption = q.options[q.correctIndex];
      const shuffledOptions = [...q.options];
      
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      
      const newCorrectIndex = shuffledOptions.indexOf(correctOption);
      
      return {
        ...q,
        options: shuffledOptions,
        correctIndex: newCorrectIndex
      };
    });
  }, [quizProvince?.id]);
  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setTimerActive(false);
    const correct = idx === currentQ.correctIndex;
    if (correct) {
      setScore(s => { const n = s + 1; scoreRef.current = n; return n; });
      setShowConfetti(true);
      setShowScorePop(true);
      setTimeout(() => setShowConfetti(false), 2500);
      setTimeout(() => setShowScorePop(false), 1500);
      window.dispatchEvent(new CustomEvent('nusaplay:quizCorrect'));
      playCorrectSound();
    } else {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 600);
      window.dispatchEvent(new CustomEvent('nusaplay:quizIncorrect'));
      playIncorrectSound();
    }

    // Complete the journey immediately on answering the final question to hide the stepper early
    if (currentIndex + 1 >= questions.length) {
      setJourneyCompleted(true);
    }
  };

  const handleTimerExpire = () => {
    if (!answered) {
      setAnswered(true);
      setSelected(-1); // No selection = timed out
      setTimerActive(false);
      window.dispatchEvent(new CustomEvent('nusaplay:quizIncorrect'));

      // Complete the journey immediately on final question timeout to hide the stepper early
      if (currentIndex + 1 >= questions.length) {
        setJourneyCompleted(true);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const snapshotScore = scoreRef.current;
      setFinalScore(snapshotScore);
      setDone(true);
      setJourneyCompleted(true);
      window.dispatchEvent(new CustomEvent('nusaplay:quizComplete', { detail: { score: snapshotScore } }));
      playSuccessSound();
      // completeQuiz is called via useEffect once done+finalScore are committed to state
    } else {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setAnswered(false);
      setTimerActive(true);
    }
  };

  if (!visible) return null;

  if (activeOnly && !quizProvince) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F2F2F2' }}>
        <div style={{ width: '30px', height: '30px', border: '3px solid var(--c-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  // ── PROVINCE SELECTION VIEW ──
  if (selectionOnly || (!activeOnly && !quizProvince)) {
    return (
      <motion.div
        className="quiz-selection-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="quiz-selection-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          UJI PENGETAHUAN NUSANTARA
        </motion.h1>
        <motion.p
          className="quiz-selection-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Pilih provinsi untuk mulai menguji pemahaman budayamu
        </motion.p>

        {/* Search input with expandable slide transition matching the details page */}
        <motion.div
          className={`cl-search-wrapper quiz-search-wrapper ${searchQuery ? 'has-query' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <SearchIcon size={16} />
          <input
            type="text"
            placeholder="Cari provinsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="cl-search-clear" onClick={() => setSearchQuery('')}>&times;</button>
          )}
        </motion.div>
        
        {filteredProvinces.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--c-text-soft-dark)', width: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Mascot pose="sad" size={140} />
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 500, letterSpacing: '0.02em' }}>
              Provinsi "{searchQuery}" tidak ditemukan
            </p>
          </motion.div>
        ) : (
          <div className="quiz-province-cards">
            {filteredProvinces.map((prov, i) => {
              const isQuizDone = completedQuizzes.has(prov.id);
              const isVisited = visitedProvinces.has(prov.id);
              return (
                <motion.div
                  key={prov.id}
                  className={`quiz-province-card ${!isVisited ? 'locked' : ''}`}
                  onClick={() => {
                    if (!isVisited) {
                      setLockedProvData(prov);
                      return;
                    }
                    startQuiz(prov);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={isVisited ? { y: -6, transition: { duration: 0.2 } } : {}}
                  style={{ position: 'relative' }}
                >
                  {isQuizDone && (
                    <div className="quiz-card-badge-completed" title="Kuis Selesai! Kamu mendapatkan lencana emas!">
                      TUNTAS
                    </div>
                  )}
                  {isVisited && !isQuizDone && (
                    <div className="quiz-card-badge-uncompleted" title="Kuis Belum Selesai! Selesaikan kuis ini untuk mendapatkan lencana emas!">
                      BELUM TUNTAS
                    </div>
                  )}
                  {!isVisited && (
                    <div className="quiz-card-badge-locked" title="Kuis Terkunci! Kunjungi provinsi ini di peta terlebih dahulu.">
                      TERKUNCI
                    </div>
                  )}
                  <div className="quiz-card-header">
                    <span className="quiz-card-count">{prov.cultureCount} RAGAM BUDAYA</span>
                    <h2 className="quiz-card-name">{prov.name}</h2>
                    <p className="quiz-card-tagline">{prov.tagline}</p>
                  </div>

                  {/* Best score star rating */}
                  <div className="quiz-card-stars">
                    {(() => {
                      const best = bestScores[prov.id];
                      const total = bestScoreTotals[prov.id] || 1;
                      if (best === undefined || !isVisited) {
                        // Not yet attempted — show 5 empty stars
                        return Array.from({ length: 5 }).map((_, si) => (
                          <svg key={si} className="quiz-star quiz-star--empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ));
                      }
                      // Map score to 0-5 stars
                      const ratio = best / total;
                      const filledCount = Math.round(ratio * 5);
                      return Array.from({ length: 5 }).map((_, si) => (
                        <svg key={si} className={`quiz-star ${si < filledCount ? 'quiz-star--filled' : 'quiz-star--empty'}`} viewBox="0 0 24 24" fill={si < filledCount ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ));
                    })()}
                    {bestScores[prov.id] !== undefined && isVisited && (
                      <span className="quiz-star-label">
                        Skor terbaik: {bestScores[prov.id]} / {bestScoreTotals[prov.id] || 1}
                      </span>
                    )}
                    {(bestScores[prov.id] === undefined || !isVisited) && (
                      <span className="quiz-star-label quiz-star-label--empty">Belum dimainkan</span>
                    )}
                  </div>
                
                  <button className="quiz-card-btn">
                    Mulai Kuis
                    <span>→</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        <AnimatePresence>
          {lockedProvData && (
            <motion.div 
              className="storytelling-end-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 2000 }}
            >
              <motion.div 
                className="storytelling-end-sheet"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              >
                <span className="end-sheet-badge">Kuis Terkunci</span>
                <h3 className="end-sheet-title">{lockedProvData.name}</h3>
                <div className="end-sheet-divider" />
                
                <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 16px 0' }}>
                  <Mascot pose="sad" size={150} />
                </div>
                
                <p className="end-sheet-sub" style={{ fontWeight: 600, color: 'var(--c-accent-dark)', marginBottom: '16px' }}>
                  Silakan kunjungi <strong>{lockedProvData.name}</strong> di peta dan eksplorasi salah satu kategorinya terlebih dahulu untuk membuka kuis ini!
                </p>
                
                <div className="end-sheet-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '16px' }}>
                  <button 
                    className="end-btn start-quiz"
                    onClick={() => {
                      setLockedProvData(null);
                      backToMap();
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'var(--c-accent)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 12px rgba(85, 145, 185, 0.25)',
                      transition: 'transform 0.2s, filter 0.2s',
                    }}
                  >
                    Ke Peta →
                  </button>
                  <button 
                    className="end-btn replay"
                    onClick={() => setLockedProvData(null)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Batal
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // ── ACTIVE QUIZ VIEW ──
  return (
    <motion.div
      className={`quiz-page ${shakeWrong ? 'quiz-shake' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showConfetti && <Confetti />}
      <FloatingScore show={showScorePop} points={10} />

      {!done ? (
        <>
          <h1 className="sr-only">Kuis Budaya: {quizProvince.name}</h1>
          {/* Header */}
          <div className="quiz-header">
            <div className="quiz-progress-row">
              <span className="quiz-progress-label">Soal {currentIndex + 1} dari {questions.length}</span>
              <div className="quiz-progress-bar-track">
                <motion.div
                  className="quiz-progress-bar-fill"
                  animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <CircularTimer active={timerActive && !answered} onExpire={handleTimerExpire} />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="quiz-question-card"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
            >
              <div className="quiz-province-tag">{quizProvince.name}</div>
              <h2 className="quiz-question">{currentQ.question}</h2>

              {/* Options */}
              <div className="quiz-options">
                {currentQ.options.map((opt, i) => {
                  let stateClass = '';
                  if (answered) {
                    if (i === currentQ.correctIndex) stateClass = 'correct';
                    else if (i === selected) stateClass = 'wrong';
                    else stateClass = 'dimmed';
                  }
                  return (
                    <motion.button
                      key={i}
                      className={`quiz-option ${stateClass}`}
                      onClick={() => handleSelect(i)}
                      whileHover={!answered ? { scale: 1.02, x: 6 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      animate={
                        answered && i === currentQ.correctIndex
                           ? { scale: [1, 1.04, 1] }
                           : {}
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <span className="option-letter">
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      <span className="option-text">{opt}</span>
                      {answered && i === currentQ.correctIndex && (
                        <span className="option-correct-icon">✓</span>
                      )}
                      {answered && i === selected && i !== currentQ.correctIndex && (
                        <span className="option-wrong-icon">✗</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Timed out message */}
              {answered && selected === -1 && (
                <motion.div
                  className="quiz-explanation wrong"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="exp-icon">Waktu Habis!</span>
                  <p>Jawaban yang benar: <strong>{currentQ.options[currentQ.correctIndex]}</strong></p>
                </motion.div>
              )}

              {/* Explanation */}
              <AnimatePresence>
                {answered && selected !== -1 && (
                  <motion.div
                    className={`quiz-explanation ${selected === currentQ.correctIndex ? 'correct' : 'wrong'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="exp-icon">
                      {selected === currentQ.correctIndex ? 'Tepat!' : 'Kurang Tepat'}
                    </span>
                    <p>{currentQ.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {answered && (
                <motion.button
                  className="quiz-next-btn"
                  onClick={handleNext}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.04 }}
                >
                  {currentIndex + 1 >= questions.length ? 'Lihat Hasil' : 'Soal Berikutnya →'}
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        /* ── RESULT SCREEN ── */
        <QuizResult score={score} total={questions.length} provinceName={quizProvince.name} onRetry={() => startQuiz(null)} onMap={backToMap} />
      )}
    </motion.div>
  );
};

// ── Standalone Result Screen ──────────────────────────────────────────────
const QuizResult = ({ score, total, provinceName, onRetry, onMap }: any) => {
  const g = getGrade(score, total);
  const [showFinalConfetti, setShowFinalConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowFinalConfetti(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="quiz-result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <h1 className="sr-only">Hasil Kuis Budaya {provinceName}</h1>
      {showFinalConfetti && score > 0 && <Confetti />}

      {/* Grade badge */}
      <motion.div
        className="quiz-grade-badge"
        style={{ borderColor: g.color, color: g.color }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {g.grade}
      </motion.div>

      <motion.h2
        className="result-title"
        style={{ color: g.color }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {g.label}
      </motion.h2>

      <motion.div
        className="quiz-score-display"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <span className="quiz-score-num">{score}</span>
        <span className="quiz-score-sep">/</span>
        <span className="quiz-score-total">{total}</span>
      </motion.div>

      <motion.p
        className="result-province"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        tentang <strong>{provinceName}</strong>
      </motion.p>

      <motion.p
        className="quiz-grade-desc"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        {g.desc}
      </motion.p>

      {/* Animated Mascot in the Center of Quiz Result */}
      <motion.div
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '110px', 
          margin: '28px 0', 
          position: 'relative' 
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.75, type: 'spring' }}
      >
        <div style={{ position: 'absolute', zIndex: 10 }}>
          <Mascot pose={score >= 3 ? "excited" : "sad"} size={260} />
        </div>
      </motion.div>

      {/* Star rating — 5 stars, same formula as the quiz card list */}
      <div className="result-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className={`result-star ${i < Math.round((score / total) * 5) ? 'lit' : ''}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
          >
            ★
          </motion.span>
        ))}
      </div>

      <motion.div
        className="result-actions"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button className="result-btn explore" onClick={onRetry}>
          Kuis Provinsi Lain
        </button>
        <button className="result-btn map" onClick={onMap}>
          Kembali ke Peta
        </button>
      </motion.div>
    </motion.div>
  );
};
