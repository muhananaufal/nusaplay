'use client';
import { createContext, useContext, useState } from 'react';

const PlayContext = createContext<any>({});

export const usePlay = () => useContext(PlayContext);

export const PlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [play, setPlay] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [end, setEnd] = useState(false);

  return (
    <PlayContext.Provider value={{ play, setPlay, hasScroll, setHasScroll, end, setEnd }}>
      {children}
    </PlayContext.Provider>
  );
};
