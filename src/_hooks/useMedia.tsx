import { useCallback, useEffect, useRef, useState } from "react";
import useTimer from "./useTimer";
import { useAudioSourceContext } from "@/_providers/AudioSourceContext";

const useMedia = () => {
  const recorderRef = useRef<MediaRecorder>();
  const { timeReadingProps, startTimer, stopTimer, pauseTimer, resumeTimer } = useTimer();
  const chunkRef = useRef<Blob[]>([]);
  const {audioSrc, setAudioSrc, pauseAllAudio} = useAudioSourceContext()
  const [temporalSrc, setTemporalSrc] = useState("")
  const [recordingState, setRecordingState] = useState<string | undefined>(
    recorderRef.current?.state
  );

  const setUpMedia = useCallback(async () => {
    try {
      if (navigator.mediaDevices) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        recorderRef.current = new MediaRecorder(mediaStream);

        recorderRef.current.ondataavailable = (ev: BlobEvent) => {
          chunkRef.current.push(ev.data);
        };

        recorderRef.current.onstop = () => {
          const blob = new Blob(chunkRef.current, {
            type: "audio/ogg; codecs=opus",
          });
          chunkRef.current = [];
          const audioURL = URL.createObjectURL(blob);
          setAudioSrc(prev => [...prev, audioURL]);
        };

        recorderRef.current.onpause = () => {
            const blob = new Blob(chunkRef.current, {
              type: "audio/ogg; codecs=opus",
            });
            chunkRef.current = [];
            const audioURL = URL.createObjectURL(blob);
            setTemporalSrc(audioURL);
          };
      }
    } catch (error: unknown) {
      alert(error as DOMException);
    }
  }, []);



  useEffect(() => {
    setUpMedia();

  }, [setUpMedia]);

  const handleRecordingStart = () => {
    recorderRef.current?.start();
    setRecordingState(recorderRef.current?.state);
    startTimer()
    pauseAllAudio();
  };

  const handleRecordingPause = () => {
    recorderRef.current?.pause();
    setRecordingState(recorderRef.current?.state);
    pauseTimer()
  };

  const handleRecordingStop = () => {
    recorderRef.current?.stop();
    setRecordingState(recorderRef.current?.state);
    stopTimer()
  };

  const handleRecordingResume = () => {
    recorderRef.current?.resume();
    setRecordingState(recorderRef.current?.state);
    resumeTimer()
  };

  const handleRecordingDelete = () => {
    chunkRef.current = [];
    setRecordingState("");
    setTemporalSrc("")
    setUpMedia();
    stopTimer()
  };

  return {
    handleRecordingStart,
    handleRecordingPause,
    handleRecordingStop,
    handleRecordingResume,
    recorderRef,
    recordingState,
    audioSrc,
    handleRecordingDelete,
    temporalSrc,
    timeReading: timeReadingProps.timeReading
  };
};

export default useMedia;
