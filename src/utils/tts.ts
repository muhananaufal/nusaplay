// Web Speech API TTS wrapper for NusaPlay storytelling
// Falls back gracefully if browser does not support SpeechSynthesis

let utterance: SpeechSynthesisUtterance | null = null;

export const tts = {
  /** Speak text out loud */
  speak(text: string, { lang = 'id-ID', rate = 0.9, pitch = 1, onEnd, onBoundary }: { lang?: string, rate?: number, pitch?: number, onEnd?: () => void, onBoundary?: (e: any) => void } = {}) {
    this.stop();
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Prefer an Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id'));
    if (idVoice) utterance.voice = idVoice;

    if (onEnd) {
      utterance.onend = onEnd;
    }
    if (onBoundary) {
      utterance.onboundary = onBoundary;
    }

    window.speechSynthesis.speak(utterance);
  },

  /** Pause the current speech */
  pause() {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.pause();
  },

  /** Resume the paused speech */
  resume() {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.resume();
  },

  /** Stop and cancel all speech */
  stop() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    utterance = null;
  },

  /** Check if currently speaking */
  isSpeaking(): boolean {
    return (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis.speaking : false;
  },

  /** Get available voices */
  getVoices() {
    return (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis.getVoices() : [];
  },
};

export default tts;
