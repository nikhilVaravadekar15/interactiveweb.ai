"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { create } from "@/http";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import { inputFormSchema } from "@/zod";
import { TInputFormSchema } from "@/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, PlusCircle, ArrowBigRight, Send } from "lucide-react";
import Link from "next/link";

export default function Create() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [successId, setSuccessId] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TInputFormSchema>({
    resolver: zodResolver(inputFormSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TInputFormSchema) => {
      return await create(data);
    },
    onSuccess: async (response) => {
      setSuccessId(response.data.id);
      toast({
        variant: "default",
        title: "Successfully added",
      });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Oh oh! Something went wrong,",
        description: "Please try again later.",
      });
    },
    onSettled: () => {
      reset();
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successId) {
      timer = setTimeout(() => {
        setSuccessId("");
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [successId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group w-[256px] h-[192px] outline outline-gray-600 shadow-sm cursor-pointer hover:shadow-md hover:outline-gray-700"
        >
          <PlusCircle
            size={32}
            className="text-gray-600 group-hover:text-gray-700"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[20%] top-[24%]">
        <DialogHeader>
          <DialogDescription asChild>
            {mutation.isPending ? (
              <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <div className="flex gap-2 flex-col items-center justify-center cursor-progress">
                  <Spinner color="purple" classname="w-6 h-6" />
                  <span>Please wait, Our AI is working super hard...</span>
                </div>
              </div>
            ) : successId ? (
              <div className="w-full h-full flex flex-col items-center justify-center rounded cursor-pointer">
                <div className="p-2 h-full w-full flex flex-col gap-2 justify-center">
                  <div className="w-full flex gap-2 text-lg items-center justify-center">
                    Start chatting with 🤖
                    <Link
                      href={`/u/${successId}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      here
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center rounded cursor-pointer">
                <form
                  onSubmit={handleSubmit((data) => {
                    mutation.mutate(data);
                  })}
                  className="p-2 h-full w-full flex flex-col gap-2 justify-center"
                >
                  <div className="p-2 w-full flex gap-2 items-center justify-center">
                    <Input
                      {...register("url")}
                      autoFocus={true}
                      autoComplete="off"
                      className="h-14 focus-visible:ring-0 text-black dark:text-white "
                    />
                  </div>
                  <span className="h-3 mb-3 px-2 text-base font-semibold text-red-600">
                    <ErrorMessage errors={errors} name="url" />
                  </span>
                </form>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
