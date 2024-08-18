import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

type TMessageProps = {
  content: string;
  isUserMessage: boolean;
};

export default function Message({ content, isUserMessage }: TMessageProps) {
  return (
    <div
      className={cn({
        "bg-zinc-800": isUserMessage,
        "bg-zinc-900/25": !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-100 bg-zinc-50 flex justify-center items-center",
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
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUserMessage ? "You" : "Website"}
              </span>
            </div>

            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
