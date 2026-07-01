import { PHASES } from '@/contexts/AppFlow';

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
