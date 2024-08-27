import useMediaPlayer from "@/_hooks/useMediaPlayer";
import { Button } from "./ui/button";
import { LoaderIcon, Pause, PlayIcon } from "lucide-react";
import { Slider } from "./ui/slider";

export default function AudioPlayer({ audioSrc, index }: { audioSrc: string , index:number}) {
  const {
    playedPercent,
    onSliderChange,
    // currentPlayTime,
    audioState,
    handlePlay,
    handlePause,
    handlePlaybackRate,
    loading,
    playbackRate,
    audioRef,
  } = useMediaPlayer(audioSrc, index);

  

  return (
    <>
      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>

      <div className="bg-secondary/20 flex w-3/4 ml-auto border p-3 border-secondary rounded-md h-fit items-center space-x-2">
        {loading && <LoaderIcon className="h-5 w-5 animate-spin" /> }
       {!loading &&  <Button onClick={handlePlaybackRate} className="px-4 w-16 rounded-full">
          {playbackRate}x
        </Button>}
        {!loading && <Button
          onClick={audioState === "playing" ? handlePause : handlePlay}
          size="icon"
          className="rounded-full"
          variant="ghost"
        >
          {audioState !== "playing" ? <PlayIcon /> : <Pause />}
        </Button>}
        <div className="flex-1 ">
          <Slider
            value={
              typeof playedPercent === "number"
                ? [playedPercent]
                : playedPercent
            }
            min={0}
            max={100}
            className=""
            onValueChange={onSliderChange}
          />
        </div>
      </div>
    </>
  );
}
