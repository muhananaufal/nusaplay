'use client';
import { useState, useEffect, useRef } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { usePlay } from '@/contexts/Play';
import { getStepFromPhase } from '@/utils/journey';
import { motion, AnimatePresence } from 'framer-motion';

// Types of animation poses
type PoseType = 'idle' | 'excited' | 'thinking' | 'sad';


// Indonesian cultural fun trivia pool (no emojis)
const FUN_TRIVIA = [
  "Tahukah kamu? Tari Bedhaya Ketawang dipercaya diciptakan oleh Sultan Agung bersama Kanjeng Ratu Kidul penguasa Laut Selatan!",
  "Tahukah kamu? Alat musik Sape dari Kalimantan memiliki nada yang lembut untuk menggambarkan ketenangan belantara Borneo.",
  "Tahukah kamu? Noken Papua dianyam menggunakan serat kayu pohon Manduam oleh mama-mama Papua sebagai simbol kebijaksanaan.",
  "Tahukah kamu? Tugu Khatulistiwa Pontianak didirikan tepat di garis nol derajat, di mana bayangan benda bisa hilang saat kulminasi!",
  "Tahukah kamu? Wayang Kulit Purwa terbuat dari kulit kerbau yang ditatah sangat halus selama berminggu-minggu lamanya.",
];

export function MascotAssistant() {
  const { phase, selectedProvince, selectedCulture } = useAppFlow();
  const { journeyStep, journeyCompleted, setJourneyCompleted, tourActive } = usePlay();
  const [pose, setPose] = useState<PoseType>('idle');
  // frame/direction state removed — sprite cycling is now a pure CSS animation
  // (see .mascot-sprite-body in globals.css) to avoid 4 React re-renders/second.
  const [speech, setSpeech] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to trigger temporary reactions
  const triggerReaction = (reactionPose: PoseType, text: string, duration = 4000) => {
    setPose(reactionPose);
    setSpeech(text);
    setIsMinimized(false);
    setIsExiting(false);

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setPose('idle');
      updateDefaultSpeech();
    }, duration);
  };

  // Determine speech text based on app state (no emojis to prevent AI Slop)
  const updateDefaultSpeech = () => {
    const currentPhaseStep = getStepFromPhase(phase);
    const isCompletedStep = currentPhaseStep < journeyStep || journeyCompleted;

    if (isCompletedStep) {
      switch (phase) {
        case PHASES.MAP:
          setSpeech("Silakan pilih pulau atau provinsi untuk melihat budayanya!");
          setPose('idle');
          break;
        case PHASES.PROVINCE:
          setSpeech("Silakan pilih kebudayaan di bawah untuk dipelajari.");
          setPose('idle');
          break;
        case PHASES.LIST:
          setSpeech("Kamu bisa menyaring kategori budaya atau mencarinya di kolom pencarian.");
          setPose('idle');
          break;
        case PHASES.DETAIL:
          setSpeech("Selamat menyimak kisah kebudayaan yang agung ini!");
          setPose('idle');
          break;
        case PHASES.QUIZ:
          setSpeech("Ayo uji wawasanmu dengan menjawab kuis daerah!");
          setPose('idle');
          break;
        default:
          setSpeech("Mari bersama melestarikan keindahan budaya Nusantara.");
          setPose('idle');
      }
      return;
    }

    switch (phase) {
      case PHASES.SPLASH:
        setSpeech("Langkah 1/4: Pembukaan! Selamat Datang! Saya Nusa, pemandumu. Klik 'JELAJAHI SEKARANG' untuk memulai petualangan.");
        setPose('idle');
        break;
      case PHASES.JOURNEY:
        setSpeech("Langkah 1/4: Pembukaan! Kencangkan sabuk pengamanmu. Kita sedang terbang melintasi keindahan kepulauan Indonesia.");
        setPose('excited');
        break;
      case PHASES.MAP:
        setSpeech("Langkah 2/4: Eksplorasi Peta! Pilih salah satu provinsi pada peta di bawah untuk mendarat.");
        setPose('thinking');
        break;
      case PHASES.PROVINCE:
        const provName = selectedProvince?.name || 'Provinsi';
        setSpeech(`Langkah 2/4: Pilih Kebudayaan! Selamat datang di ${provName}. Silakan pilih kebudayaan di bawah untuk dipelajari.`);
        setPose('idle');
        break;
      case PHASES.LIST:
        setSpeech("Langkah 2/4: Cari Kebudayaan! Kamu bisa menyaring kategori budaya atau mencarinya di kolom pencarian.");
        setPose('thinking');
        break;
      case PHASES.DETAIL:
        const cultName = selectedCulture?.name || 'Kebudayaan';
        setSpeech(`Langkah 3/4: Belajar Budaya! Simak cerita ${cultName} ini, putar videonya, lalu klik 'Mulai Kuis'!`);
        setPose('excited');
        break;
      case PHASES.QUIZ:
        const quizProvName = selectedProvince?.name || 'Provinsi';
        setSpeech(`Langkah 4/4: Uji Kuis! Jawab kuis ${quizProvName} ini dengan benar untuk melengkapi paspormu.`);
        setPose('thinking');
        break;
      default:
        setSpeech("Mari bersama melestarikan keindahan budaya Nusantara.");
        setPose('idle');
    }
  };

  // Update default speech when phase or selected items change
  useEffect(() => {
    updateDefaultSpeech();
    // Auto-maximize mascot when entering a new stage of the journey
    setIsMinimized(false);
    setIsExiting(false);
  }, [phase, selectedProvince?.id, selectedCulture?.id, journeyStep, journeyCompleted]);

  // Listen to Quiz custom events (no emojis to prevent AI Slop)
  useEffect(() => {
    const handleQuizCorrect = () => {
      const positiveTexts = [
        "Luar biasa! Jawabanmu 100% benar.",
        "Hebat! Kamu benar-benar menyimak sejarah kita.",
        "Mantap! Poin penuh untukmu. Lanjutkan.",
      ];
      const randText = positiveTexts[Math.floor(Math.random() * positiveTexts.length)];
      triggerReaction('excited', randText, 3500);
    };

    const handleQuizIncorrect = () => {
      const negativeTexts = [
        "Aduh, sayang sekali masih belum tepat. Jangan menyerah ya.",
        "Kurang beruntung kali ini. Baca penjelasannya untuk belajar lagi.",
        "Coba diingat-ingat lagi, mari coba soal berikutnya.",
      ];
      const randText = negativeTexts[Math.floor(Math.random() * negativeTexts.length)];
      triggerReaction('sad', randText, 4500);
    };

    const handleQuizComplete = (e: Event) => {
      const score = (e as CustomEvent).detail?.score ?? 0;
      let review = "Kuis selesai.";
      if (score === 5) review = "Selamat! Kamu mendapat nilai 5/5. Petualangan lengkap dan stempel paspormu telah diperbarui!";
      else if (score >= 3) review = `Hebat! Kamu berhasil menjawab ${score}/5 soal dengan benar. Langkah akhir perjalanan selesai!`;
      else review = `Kuis selesai. Kamu menjawab ${score}/5 dengan benar. Kamu hebat, mari terus belajar ya!`;
      triggerReaction('excited', review, 6000);
      setJourneyCompleted(true);
    };

    window.addEventListener('nusaplay:quizCorrect', handleQuizCorrect);
    window.addEventListener('nusaplay:quizIncorrect', handleQuizIncorrect);
    window.addEventListener('nusaplay:quizComplete', handleQuizComplete);

    return () => {
      window.removeEventListener('nusaplay:quizCorrect', handleQuizCorrect);
      window.removeEventListener('nusaplay:quizIncorrect', handleQuizIncorrect);
      window.removeEventListener('nusaplay:quizComplete', handleQuizComplete);
    };
  }, [setJourneyCompleted]);

  // Sprite animation handled by CSS @keyframes — see .mascot-sprite-body in globals.css.
  // The old setInterval that called setFrame every 250ms has been removed;
  // it caused 4 React component re-renders per second even when the mascot
  // was invisible or the user was on a completely different page.

  // Show a random trivia when mascot is clicked
  const handleMascotClick = () => {
    const randomTrivia = FUN_TRIVIA[Math.floor(Math.random() * FUN_TRIVIA.length)];
    triggerReaction('excited', randomTrivia, 6500);
  };

  // Render the background position style based on CSS animation
  // (the CSS @keyframes steps through frame 0 → 1 → 2 → 1 → 0 at the right timing)

  return (
    <div className="mascot-root">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // Minimized Floating Circle Icon
          <motion.button
            key="minimized"
            className="mascot-minimized-btn"
            onClick={() => setIsMinimized(false)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.1 }}
            title="Buka Pemandu Nusa"
          >
            <video 
              src="/mascot/maskot.webm"
              autoPlay
              loop
              muted
              playsInline
              className="mascot-sprite-minimized" 
            />
          </motion.button>
        ) : (
          <motion.div
            key="full"
            className="mascot-wrapper"
            style={{ transformOrigin: "bottom right" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isExiting ? {
              scale: 0,
              opacity: 0
            } : {
              scale: 1,
              opacity: 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={isExiting ? {
              type: "spring",
              stiffness: 300,
              damping: 25
            } : {
              type: "spring",
              stiffness: 260,
              damping: 18
            }}
            onAnimationComplete={() => {
              if (isExiting) {
                setIsMinimized(true);
                setIsExiting(false);
              }
            }}
          >
            {/* Speech Bubble */}
            <AnimatePresence mode="wait">
              {speech && !isExiting && !tourActive && (
                <motion.div
                  key={speech}
                  className="mascot-bubble"
                  initial={{ scale: 0.9, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mascot-bubble-header">Nusa Pemandu</div>
                  <p className="mascot-bubble-text">{speech}</p>
                  
                  {/* Actions inside speech bubble (Minimize only) */}
                  <div className="mascot-bubble-actions">
                    <button 
                      className="mascot-bubble-action-btn"
                      onClick={() => setIsExiting(true)}
                    >
                      Minimalkan
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Mascot Sprite */}
            <div className="mascot-click-target" onClick={handleMascotClick}>
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
        )}
      </AnimatePresence>
    </div>
  );
}
