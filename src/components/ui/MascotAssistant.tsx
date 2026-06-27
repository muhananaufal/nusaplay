'use client';
import { useState, useEffect, useRef } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { motion, AnimatePresence } from 'framer-motion';

// Types of animation poses
type PoseType = 'idle' | 'excited' | 'thinking' | 'sad';

// Mapping of sheets to image files
const POSE_SHEETS: Record<PoseType, string> = {
  idle: '/images/mascot/idle_sheet.png',
  excited: '/images/mascot/excited_sheet.png',
  thinking: '/images/mascot/thinking_sheet.png',
  sad: '/images/mascot/sad_sheet.png',
};

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
    switch (phase) {
      case PHASES.SPLASH:
        setSpeech("Halo! Saya Nusa, pemandumu. Klik 'JELAJAHI SEKARANG' untuk mulai terbang bersamaku.");
        setPose('idle');
        break;
      case PHASES.JOURNEY:
        setSpeech("Kencangkan sabuk pengamanmu. Kita sedang terbang melintasi kepulauan Nusantara.");
        setPose('excited');
        break;
      case PHASES.MAP:
        setSpeech("Klik salah satu pulau di peta untuk mendarat dan mulai menjelajahi budayanya.");
        setPose('thinking');
        break;
      case PHASES.PROVINCE:
        const provName = selectedProvince?.name || 'Provinsi';
        setSpeech(`Selamat datang di ${provName}. Di sini kaya akan budaya unik. Yuk pilih kategori di bawah, atau langsung uji ingatan lewat Kuis.`);
        setPose('idle');
        break;
      case PHASES.LIST:
        setSpeech("Pilih kategori pil di bawah untuk memfilter kebudayaan, atau cari secara instan lewat kolom pencarian.");
        setPose('thinking');
        break;
      case PHASES.DETAIL:
        const cultName = selectedCulture?.name || 'Kebudayaan';
        setSpeech(`Wah, indahnya ${cultName}. Klik tombol audio di bawah judul untuk mendengar pembacaan narasi budayanya.`);
        setPose('excited');
        break;
      case PHASES.QUIZ:
        setSpeech("Yuk uji pemahaman budayamu. Pilih salah satu kuis provinsi yang sudah terbuka.");
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
  }, [phase, selectedProvince?.id, selectedCulture?.id]);

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
      if (score === 5) review = "Sempurna! Kamu dapat nilai 5/5. Pengetahuan budayamu luar biasa.";
      else if (score >= 3) review = `Hebat! Kamu berhasil menjawab ${score}/5 soal dengan benar.`;
      else review = `Kuis selesai. Kamu menjawab ${score}/5 dengan benar. Terus belajar ya.`;
      triggerReaction('excited', review, 6000);
    };

    window.addEventListener('nusaplay:quizCorrect', handleQuizCorrect);
    window.addEventListener('nusaplay:quizIncorrect', handleQuizIncorrect);
    window.addEventListener('nusaplay:quizComplete', handleQuizComplete);

    return () => {
      window.removeEventListener('nusaplay:quizCorrect', handleQuizCorrect);
      window.removeEventListener('nusaplay:quizIncorrect', handleQuizIncorrect);
      window.removeEventListener('nusaplay:quizComplete', handleQuizComplete);
    };
  }, []);

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
            <div 
              className="mascot-sprite-minimized" 
              style={{
                backgroundImage: `url(${POSE_SHEETS.idle})`,
              }}
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
              {speech && !isExiting && (
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
              <div 
                className={`mascot-sprite-body ${pose}`}
                style={{
                  backgroundImage: `url(${POSE_SHEETS[pose]})`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
