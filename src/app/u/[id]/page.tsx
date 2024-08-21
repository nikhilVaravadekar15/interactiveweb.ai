"use client";

import React from "react";
import Link from "next/link";
import { useChat } from "ai/react";
import Message from "@/components/Message";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, MessageSquare } from "lucide-react";

type Props = { params: { id: string } };

export default function Page({ params }: Props) {
  const router = useRouter();
  if (!params.id || params.id.length != 36) {
    router.push("/404");
  }

  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    setInput,
    reload,
    error,
    stop,
    isLoading,
    handleSubmit,
    handleInputChange,
  } = useChat({
    api: "/api/chat/",
    body: {
      id: params.id,
    },
  });

  React.useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="relative min-h-full flex justify-center">
      <Link href={"/"} title="Home" className="hidden md:block">
        <Button
          type="button"
          variant={"ghost"}
          className="absolute h-full top-0 left-0 rounded-none"
        >
          <ArrowBigLeft className="size-4" />
        </Button>
      </Link>
      <div className="relative w-full flex divide-y divide-zinc-700 flex-col justify-between gap-2 lg:max-w-3xl xl:max-w-4xl">
        <div className="flex-1 justify-between flex flex-col">
          <div className="flex max-h-[calc(100vh-6.5rem)] flex-1 flex-col overflow-y-auto">
            {messages.length ? (
              <>
                {messages.map((message: any, i: number) => (
                  <Message
                    key={i}
                    ref={i === messages.length - 1 ? lastMessageRef : null}
                    content={message.content}
                    isUserMessage={message.role === "user"}
                  />
                ))}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-2">
                <MessageSquare className="size-8 text-blue-500" />
                <h3 className="font-semibold text-xl text-black">
                  {"You're all set!"}
                </h3>
                <p className="text-zinc-700 text-sm">
                  Ask your first question to get started.
                </p>
              </div>
            )}
          </div>
        </div>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
          error={error}
          reload={reload}
          stop={stop}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
