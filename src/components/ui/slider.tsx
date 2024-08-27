import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type Props = {
  onTrackPress?: React.MouseEventHandler<HTMLSpanElement>;
  onTrackLeave?: React.MouseEventHandler<HTMLSpanElement>;
  onThumbPress?: React.MouseEventHandler<HTMLSpanElement>;
  onThumbLeave?: React.MouseEventHandler<HTMLSpanElement>;
};
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & Props
>(({ className, ...props }, ref) => {
  const {
    onTrackLeave,
    onTrackPress,
    onThumbLeave,
    onThumbPress,
    ...otherProps
  } = props;
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...otherProps}
    >
      <SliderPrimitive.Track
        onPointerDown={onTrackPress}
        onPointerUp={onTrackLeave}
        className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20 transition-all"
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary " />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        onPointerDown={onThumbPress}
        onPointerUp={onThumbLeave}
        className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 "
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
