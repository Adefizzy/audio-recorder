import { Input } from "./components/ui/input";
import useMedia from "./_hooks/useMedia";
import AudioPlayer from "./components/AudioPlayer";
import SendButton from "./components/SendButton";
import RecordingButton from "./components/RecordingButton";
import RecordingTracker from "./components/RecordingTracker";
import DeleteRecordingButton from "./components/DeleteRecordingButton";

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
          <DeleteRecordingButton
            recordingState={recordingState}
            handleRecordingDelete={handleRecordingDelete}
          />
          {recordingState === "recording" || recordingState === "paused" ? (
            <RecordingTracker
              recordingState={recordingState}
              timeReading={timeReading}
            />
          ) : (
            <Input className="rounded-full flex-1" />
          )}
          <RecordingButton
            recordingState={recordingState}
            handleRecordingPause={handleRecordingPause}
            handleRecordingResume={handleRecordingResume}
            handleRecordingStart={handleRecordingStart}
          />
          {(recordingState === "recording" || recordingState === "paused") && (
            <SendButton onClick={handleRecordingStop} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
