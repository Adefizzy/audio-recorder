type Props = {
  recordingState: RecordingState;
  timeReading: string;
};

export default function RecordingTracker({
  timeReading,
  recordingState,
}: Props) {
  return (
    <div className="flex-1 flex items-center space-x-3">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
      </span>
      <p className="w-10">{timeReading}</p>
      <div className="flex-1">{recordingState}</div>
    </div>
  );
}
