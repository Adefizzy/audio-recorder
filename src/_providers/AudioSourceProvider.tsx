import { createContext, ReactNode, useRef, useState } from "react";

type AudioRef = { ref: HTMLAudioElement | null; index: number };
type AudioContextProps = {
  audioSrc: string[];
  setAudioSrc: React.Dispatch<React.SetStateAction<string[]>>;
  audioRefs: AudioRef[] | null;
  addAudio: (audio: AudioRef) => void;
  pauseAllAudio():void;
  pauseAllButOne(index: number):void
};

export const AudioSourceContext = createContext<AudioContextProps | null>(null);

export const AudioSourceProvider = ({ children }: { children: ReactNode }) => {
  const [audioSrc, setAudioSrc] = useState<string[]>([]);
  const audioRefs = useRef<AudioRef[]>(null);
  const addAudio = (audio: AudioRef) => {
    if (audioRefs.current) {
      audioRefs.current.push(audio);
    }
  };

  const pauseAllAudio = () => {
    audioRefs.current?.forEach((audio) => audio.ref?.pause());
  };

  const pauseAllButOne = (index: number) => {
    audioRefs.current?.forEach((audio) => {
      if (audio.index !== index) {
        audio.ref?.pause();
      }
    });
  };

  return (
    <AudioSourceContext.Provider
      value={{
        audioSrc,
        setAudioSrc,
        addAudio,
        audioRefs: audioRefs.current,
        pauseAllAudio,
        pauseAllButOne
      }}
    >
      {children}
    </AudioSourceContext.Provider>
  );
};
