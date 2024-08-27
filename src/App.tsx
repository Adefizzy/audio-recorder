import { Mic, Pause, Plus, SendHorizonal, Trash } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import useMedia from "./_hooks/useMedia";
import AudioPlayer from "./components/AudioPlayer";


function App() {
  const {
    handleRecordingStart,
    handleRecordingPause,
    handleRecordingStop,
    handleRecordingResume,
    recordingState,
    handleRecordingDelete,
    audioSrc,
    timeReading,
  } = useMedia();

  return (
    <div className=" w-screen p-3 h-screen l">
      <div className="border border-secondary space-y-2 lg:w-[40%] w-full h-full mx-auto rounded-md p-2 grid content-end">
        {audioSrc.map((src, index) => (
          <AudioPlayer audioSrc={src} index={index} key={src} />
        ))}
        <div className="flex space-x-2 w-full shadow-sm py-5 bg-slate-100 rounded-md">
          <Button
            size="icon"
            className="rounded-full basis-auto"
            variant="ghost"
            onClick={
              recordingState && recordingState !== "inactive"
                ? handleRecordingDelete
                : undefined
            }
          >
            {recordingState && recordingState !== "inactive" ? (
              <Trash />
            ) : (
              <Plus />
            )}
          </Button>
          {recordingState === "recording" || recordingState === "paused" ? (
            <div className="flex-1 flex items-center space-x-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
              </span>
              <p className="w-10">{timeReading}</p>
              <div className="flex-1">{recordingState}</div>
            </div>
          ) : (
            <Input className="rounded-full flex-1" />
          )}
          <Button
            onClick={
              recordingState === "recording"
                ? handleRecordingPause
                : recordingState === "paused"
                ? handleRecordingResume
                : handleRecordingStart
            }
            size="icon"
            className="rounded-full basis-auto"
            variant="ghost"
          >
            {recordingState === "recording" ? <Pause /> : <Mic />}
          </Button>

          {(recordingState === "recording" || recordingState === "paused") && (
            <Button
              onClick={handleRecordingStop}
              size="icon"
              className="rounded-full basis-auto border border-secondary"
              variant="ghost"
            >
              <SendHorizonal className="fill-white stroke-secondary stroke-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
