import { Mic, Pause } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  recordingState?: RecordingState;
  handleRecordingPause(): void;
  handleRecordingResume(): void;
  handleRecordingStart(): void;
};
export default function RecordingButton({
  recordingState,
  handleRecordingPause,
  handleRecordingResume,
  handleRecordingStart,
}: Props) {
  return (
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
  );
}
