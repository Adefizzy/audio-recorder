import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeReading = (startTime: number) => {
  const now = new Date().getTime();
  const duration = now - startTime;
  
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

   const minutesString = minutes <= 9? `${minutes}`.padStart(2, '0') : `${minutes}`;
   const secondsString = seconds <= 9? `${seconds}`.padStart(2, '0') : `${seconds}`
  return {
    timeReading:  `${minutesString}:${secondsString}`,
    minutes,
    seconds
  };
};