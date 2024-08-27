import { useCallback, useEffect, useRef, useState } from "react";

export default function useMediaPlayer(audioSrc: string, index: number) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [playedPercent, setPlayedPercent] = useState<number | undefined>(
    undefined
  );
  const [audioState, setAudioState] = useState<
    "ended" | "playing" | "paused" | ""
  >("");
  const [playbackRate, setPlayBackRate] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.preload = "auto";
      audioRef.current?.load();
    }
  }, [audioSrc, index]);

  useEffect(() => {
    const audio = audioRef.current;
    audio?.addEventListener("ended", () => {
      setAudioState("ended");
      setPlayedPercent(0);
    });

    return () =>
      audio?.removeEventListener("ended", () => {
        setAudioState("ended");
      });
  }, []);

  const loadDuration = useCallback(async () => {
    const audio = audioRef.current;

    if (audio && loading) {
      await audio?.play();
      audio.playbackRate = 15;
      audio.muted = true;
    }

    audio?.addEventListener("timeupdate", () => {
      if (!isNaN(audio?.duration) && audio?.duration !== Infinity) {
        setLoading((loading) => {
          if (loading) {
            audio?.pause();
            audio.currentTime = 0;
            audio.playbackRate = 1;
            audio.muted = false;
          }
          return false;
        });
      }
    });
  }, [loading]);

  useEffect(() => {
    loadDuration();
  }, [loadDuration]);


  const handlePlay = async () => {
    const audio = audioRef.current;
    await audio?.play();
    setAudioState("playing");
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio?.pause();
      setAudioState("paused");
    }
  };

  const handlePlaybackRate = () => {
    const audio = audioRef.current;
    if (audio) {
      if (playbackRate < 2) {
        const newPlaybackRate = playbackRate + 0.5;
        setPlayBackRate(newPlaybackRate);
        audio.playbackRate = newPlaybackRate;
      } else {
        setPlayBackRate(1);
        audio.playbackRate = 1;
      }
    }
  };

  const getPlayPercent = useCallback((currentTime: number) => {
    if (audioRef.current) {
      const playedPercent = (currentTime * 100) / audioRef.current?.duration;
      setPlayedPercent(playedPercent);
    }
  }, []);

  const onPlaying = useCallback(
    (audio: HTMLAudioElement) => {
      audio.ontimeupdate = () => {
        getPlayPercent(audio.currentTime);
      };
    },
    [getPlayPercent]
  );

  useEffect(() => {
    if (audioRef.current) onPlaying(audioRef.current);
  }, [onPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = currentPlayTime;
  }, [currentPlayTime]);

  useEffect(() => {
    const audio = audioRef.current;
    audio?.addEventListener("durationchange", () => {
      if (audio && audio.duration != Infinity) {
        setDuration(audio.duration);
      }
    });

    return () =>
      audio?.removeEventListener("durationchange", () => {
        if (audio && audio.duration != Infinity) {
          setDuration(audio.duration);
        }
      });
  }, []);

  const onSliderChange = (value: number[]) => {
    const currentPlayTime = (duration * (value.at(0) ?? 0)) / 100;
    setCurrentPlayTime(currentPlayTime);
    setPlayedPercent(value.at(0) ?? 0);
  };



  return {
    playedPercent,
    onSliderChange,
    currentPlayTime,
    audioState,
    handlePlay,
    handlePause,
    handlePlaybackRate,
    playbackRate,
    audioRef,
    loading,
  };
}
