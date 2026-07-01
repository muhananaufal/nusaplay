import React from 'react';

interface AchievementIconProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AchievementIcon: React.FC<AchievementIconProps> = ({ id, className = "", style }) => {
  const getIcon = () => {
    switch (id) {
      case 'first_audio': // Pendengar Mula (Clean Minimalist Headphones)
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9" />
            <path d="M3 14h2v5H3zM19 14h2v5h-2z" />
            <path d="M5 19h14" />
          </svg>
        );

      case 'first_quiz': // Uji Wawasan (Clean Document)
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M9 9h6M9 13h6M9 17h4" />
          </svg>
        );

      case 'perfect_quiz':
      case 'perfect_quiz_jawa-tengah':
      case 'perfect_quiz_diy':
      case 'perfect_quiz_kalimantan-barat':
      case 'perfect_quiz_papua': // Cendekia Sempurna (Geometric Star)
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );

      case 'explore_province':
      case 'explore_province_jawa-tengah':
      case 'explore_province_diy':
      case 'explore_province_kalimantan-barat':
      case 'explore_province_papua': // Penjelajah Daerah (Clean Compass / Crosshair)
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v20M2 12h20M16.24 7.76l-8.48 8.48" />
          </svg>
        );

      case 'listen_province':
      case 'listen_province_jawa-tengah':
      case 'listen_province_diy':
      case 'listen_province_kalimantan-barat':
      case 'listen_province_papua': // Kolektor Suara (Clean Equalizer / Sound Waves)
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4" />
          </svg>
        );

      case 'explore_indonesia': // Ksatria Nusantara (Clean Geometric Shield)
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M8 11h8M12 7v8" />
          </svg>
        );

      case 'listen_indonesia': // Empu Nusantara (Geometric Crown)
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M2 4l3 12h14l3-12-5 6-3-8-3 8-5-6z" />
            <rect x="5" y="16" width="14" height="3" rx="1" />
          </svg>
        );

      default: // Fallback Trophy
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
            <path d="M12 2a6 6 0 0 1 6 6v3.5a6 6 0 0 1-12 0V8a6 6 0 0 1 6-6z" />
          </svg>
        );
    }
  };

  const iconElement = getIcon();
  return React.cloneElement(iconElement, { className, style });
};
