import { getTimeReading } from "@/lib/utils";
import { useRef, useState } from "react";

export default function useTimer() {
  const tickerRef = useRef<NodeJS.Timeout>(null!);
  const startRef = useRef<number | null>();

  const [timeReadingProps, setTimeReadingProps] = useState({
    minutes: 0,
    seconds: 0,
    timeReading: "00:00",
  });

  const timer = (startTime: number) => {
    const timer = setInterval(() => {
      const { minutes, seconds, timeReading } = getTimeReading(startTime);

      setTimeReadingProps({ minutes, seconds, timeReading });
    }, 1000);

    tickerRef.current = timer;
  };

  const startTimer = () => {
    startRef.current = new Date().getTime();
    timer(new Date().getTime());
  };

  const stopTimer = () => {
    console.log("STOP");
    clearInterval(tickerRef.current);
    startRef.current = null;
    localStorage.removeItem("paused");
    startRef.current = new Date().getTime();
    setTimeReadingProps({minutes: 0, seconds: 0, timeReading: "00:00"})
  };

  const pauseTimer = () => {
    console.log("PAUSED");

    if (startRef.current) {
      localStorage.paused = new Date().getTime() - startRef.current;
    }

    clearInterval(tickerRef.current);
  };

  const resumeTimer = () => {
    const newStartTime = new Date().getTime() - localStorage.paused;
    startRef.current = newStartTime;
    timer(newStartTime);
  };
  return {
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    timeReadingProps,
  };
}
