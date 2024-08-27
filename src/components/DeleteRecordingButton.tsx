import { Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  recordingState?: RecordingState;
  handleRecordingDelete(): void;
};

export default function DeleteRecordingButton({
  recordingState,
  handleRecordingDelete,
}: Props) {
  return (
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
      {recordingState && recordingState !== "inactive" ? <Trash /> : <Plus />}
    </Button>
  );
}
