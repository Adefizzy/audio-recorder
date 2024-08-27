import { useAudioSourceContext } from "@/_providers/AudioSourceContext";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useMediaPlayer(audioSrc: string, index: number) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [playedPercent, setPlayedPercent] = useState<number | undefined>(
    undefined
  );
  const {addAudio, pauseAllButOne} = useAudioSourceContext()
  /* const { onSliderChange, currentPlayTime } = usePlayedPercent(
    audioRef.current
  ); */

  const [audioState, setAudioState] = useState<
    "ended" | "playing" | "paused" | ""
  >("");

  const [playbackRate, setPlayBackRate] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.preload = "auto";
      audioRef.current?.load();
      addAudio({ref: audioRef.current, index})
    }
  }, [addAudio, audioSrc, index]);

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

  useEffect(() => {
    const audio = audioRef.current;
    audio?.addEventListener("playing", () => {
      console.log("playing");
    });

    return () =>
      audio?.removeEventListener("ended", () => {
        console.log("playing");
      });
  }, []);

  const loadDuration = useCallback(async () => {
    const audio = audioRef.current;

    if (audio && loading) {
      await audio?.play();
      audio.playbackRate = 15;
      audio.muted = true;
    }

    console.log("here now playing");
    audio?.addEventListener("timeupdate", () => {
      console.log("here now");
      if (!isNaN(audio?.duration) && audio?.duration !== Infinity) {
        console.log("timeupdate", {
          readyState: audio?.readyState,
          duration: audio?.duration,
        });

        setLoading((loading) => {
          if (loading) {
            audio?.pause();
            audio.currentTime = 0;
            console.log("final", "isLoading");
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

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;

        console.log("loadedmetadata", { duration });
        /*  if (!isNaN(duration) && duration !== Infinity) {
          console.log("Duration:", duration);
        } else {
          console.error("Failed to load media duration.");
        } */
      });
    }
  }, []);

  const handlePlay = async () => {
    const audio = audioRef.current;
    await audio?.play();
    setAudioState("playing");
    pauseAllButOne(index)

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
