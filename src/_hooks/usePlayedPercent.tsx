
export default function usePlayedPercent() {
 /*  const [playedPercent, setPlayedPercent] = useState<number | undefined>(
    undefined
  ); */
  /* const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (audio) audio.currentTime = currentPlayTime;
  }, [audio, currentPlayTime]);

  useEffect(() => {
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
  }, [audio]);

  const onSliderChange = (value: number[]) => {
    const currentPlayTime = (duration * (value.at(0) ?? 0)) / 100;
    setCurrentPlayTime(currentPlayTime);
   // setPlayedPercent(value.at(0) ?? 0);
  };

  console.log({ loading }); */

  /* const loadDuration = useCallback(async () => {
    await audio?.play();
    console.log('here now playing')
    audio?.addEventListener("timeupdate", () => {
      console.log("here now");
      if (!isNaN(audio?.duration) && audio?.duration !== Infinity) {
        console.log("timeupdate", {
          readyState: audio?.readyState,
          duration: audio?.duration,
        });

        audio.currentTime = 0;
        audio?.pause();
        setLoading(false);
      }
    });

    return () =>
      audio?.removeEventListener("timeupdate", () => {
        console.log("here now");
        if (!isNaN(audio?.duration) && audio?.duration !== Infinity) {
          console.log("timeupdate", {
            readyState: audio?.readyState,
            duration: audio?.duration,
          });

          audio.currentTime = 0;
          audio.pause();
          setLoading(false);
        }
      });
  }, [audio]);

  useEffect(() => {
    loadDuration();
  }, [loadDuration]); */

 /*  const getPlayPercent = useCallback(
    (currentTime: number) => {
      if (audio) {
        const playedPercent = (currentTime * 100) / audio?.duration;
        setPlayedPercent(playedPercent);
      }
    },
    [audio, duration]
  ); */

 /*  const onPlaying = useCallback(
    (audio: HTMLAudioElement) => {
      audio.ontimeupdate = () => {
        getPlayPercent(audio.currentTime);
      };
    },
    [getPlayPercent]
  );

  useEffect(() => {
    if (audio) onPlaying(audio);
  }, [audio, onPlaying]); */

  return {
   // playedPercent,
 /*    onSliderChange,
    currentPlayTime, */
  };
}
