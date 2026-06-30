'use client';
import { useState, useEffect } from 'react';
import { useAppFlow, PHASES } from '@/contexts/AppFlow';
import { usePlay } from '@/contexts/Play';
import { useIsMobile } from '@/utils/useIsMobile';
import { motion, AnimatePresence } from 'framer-motion';

// Definisi langkah-langkah dalam perjalanan (Total 4 langkah)
const STEPS = [
  { number: 1, label: 'Pembukaan', desc: 'Penyambutan dan penerbangan 3D' },
  { number: 2, label: 'Pilih Provinsi', desc: 'Eksplorasi peta interaktif' },
  { number: 3, label: 'Belajar Budaya', desc: 'Simak cerita & tonton video' },
  { number: 4, label: 'Uji Kuis', desc: 'Uji wawasan & lengkapi paspor' },
];

export const getStepFromPhase = (phase: string): number => {
  switch (phase) {
    case PHASES.SPLASH:
    case PHASES.JOURNEY:
      return 1;
    case PHASES.MAP:
    case PHASES.PROVINCE:
    case PHASES.LIST:
      return 2;
    case PHASES.DETAIL:
    case PHASES.STORYTELLING_END:
      return 3;
    case PHASES.QUIZ:
      return 4;
    default:
      return 1;
  }
};

export function JourneyProgress() {
  const { phase } = useAppFlow();
  const { journeyStep, setJourneyStep, journeyCompleted } = usePlay();
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile(768);

  // Jalankan efek pencatatan langkah aktif secara sekuensial (hanya bisa maju)
  useEffect(() => {
    if (journeyCompleted) return;
    const step = getStepFromPhase(phase);
    setJourneyStep(step);
  }, [phase, journeyCompleted, setJourneyStep]);

  // Jangan tampilkan stepper pada splash screen, jika tour sudah selesai sepenuhnya, atau di perangkat mobile
  if (journeyCompleted || phase === PHASES.SPLASH || isMobile) return null;

  const activeStepInfo = STEPS[journeyStep - 1];

  return (
    <div className="journey-progress-wrapper">
      {/* 
        Capsule bar utama dengan kelas CSS 'expanded' / 'collapsed'.
        Framer motion 'layout' dihapus agar tidak bentrok dengan CSS max-height transition 
        yang jauh lebih mulus tanpa stuttering (patah).
      */}
      <div className={`journey-progress-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="journey-progress-header" onClick={() => setIsExpanded(!isExpanded)}>
          {/* Status Singkat */}
          <div className="journey-progress-badge">
            <span className="badge-pulse"></span>
            Langkah {journeyStep} / 4
          </div>
          
          <div className="journey-progress-title-active">
            {activeStepInfo?.label}
          </div>

          <button className="journey-expand-btn" aria-label={isExpanded ? "Sembunyikan detail" : "Tampilkan detail"}>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Stepper Dots & Line (Selalu di DOM, tinggi diatur mulus oleh CSS max-height) */}
        <div className="journey-stepper-body">
          <div className="journey-stepper-line-container">
            {/* Background Line */}
            <div className="journey-stepper-line" />
            {/* Progress Fill Line */}
            <div 
              className="journey-stepper-line-fill" 
              style={isMobile ? { height: `${((journeyStep - 1) / (STEPS.length - 1)) * 100}%` } : { width: `${((journeyStep - 1) / (STEPS.length - 1)) * 84}%` }}
            />

            {/* Step Nodes */}
            <div className="journey-step-nodes">
              {STEPS.map((step) => {
                const isActive = step.number === journeyStep;
                const isCompleted = step.number < journeyStep;
                
                return (
                  <div 
                    key={step.number}
                    className={`journey-step-node-wrapper ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                    style={{ cursor: 'default' }} // Cursor default agar pengguna tahu tidak bisa diklik manual
                  >
                    {/* Node Bulat */}
                    <div className="journey-step-dot">
                      {isCompleted ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <span>{step.number}</span>
                      )}
                    </div>

                    {/* Label Langkah */}
                    <div className="journey-step-node-label">{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
