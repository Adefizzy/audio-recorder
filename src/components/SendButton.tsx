import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

type Props = {
    onClick():void
}

export default function SendButton({onClick}: Props) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="rounded-full basis-auto border border-secondary"
      variant="ghost"
    >
      <SendHorizonal className="fill-white stroke-secondary stroke-1" />
    </Button>
  );
}
