import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type TSpinnerProps = {
  color?: string;
  classname?: string;
};

export default function Spinner({ color, classname }: TSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        color={color ? color : "purple"}
        className={cn("h-12 w-12 animate-spin", classname)}
      />
    </div>
  );
}
