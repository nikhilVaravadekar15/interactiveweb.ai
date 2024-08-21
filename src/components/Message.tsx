"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

type TMessageProps = {
  content: string;
  isUserMessage: boolean;
};

export default React.forwardRef(function Message(
  { content, isUserMessage }: TMessageProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      className={cn({
        "bg-zinc-50": isUserMessage,
        "bg-zinc-100": !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border cursor-pointer border-purple-100 bg-purple-50 flex justify-center items-center",
              {
                "bg-blue-50 border-blue-200 text-zinc-800": isUserMessage,
              },
            )}
          >
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Bot className="size-5" />
            )}
          </div>
          <div className="flex flex-col ml-6 w-full">
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
