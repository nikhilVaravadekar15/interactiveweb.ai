"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
// import { type useChat } from "ai/react";
// import { Button, Textarea } from "@nextui-org/react";

// type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
// type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
// type SetInput = ReturnType<typeof useChat>["setInput"];

// type TChatInputProps = {
//   input: string;
//   handleInputChange: HandleInputChange;
//   handleSubmit: HandleSubmit;
//   setInput: SetInput;
// };

export default function ChatInput() {
  return (
    <div className="z-10 absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 lg:mx-auto">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <form className="relative">
              <textarea
                rows={1}
                autoFocus
                placeholder="Enter your question..."
                className="p-4 w-full border border-gray-500 resize-none rounded-3xl text-base no-scrollbar placeholder:text-gray-400"
              />
              <Button
                type="submit"
                className="absolute z-10 border border-border bg-zinc-900 right-2 bottom-4 rounded-full"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
