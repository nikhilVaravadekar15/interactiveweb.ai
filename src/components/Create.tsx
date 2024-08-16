"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import { inputFormSchema } from "@/zod";
import { TInputFormSchema } from "@/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ErrorMessage } from "@hookform/error-message";
import { create } from "@/http";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, PlusCircle, ArrowBigRight } from "lucide-react";

export default function Create() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputFormSchema>({
    resolver: zodResolver(inputFormSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TInputFormSchema) => {
      return await create(data);
    },
    onSuccess: async (response) => {},
    onError: (response) => {
      toast({
        variant: "destructive",
        title: "Oh oh! Something went wrong,",
        description: "Please try again later.",
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group w-[256px] h-[185px] outline outline-gray-600 shadow-sm cursor-pointer hover:shadow-md hover:outline-gray-700"
        >
          <PlusCircle
            size={32}
            className="text-gray-600 group-hover:text-gray-700"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[20%]">
        <DialogHeader>
          <DialogDescription asChild>
            {mutation.isPaused ? (
              <div className="w-full h-full flex flex-col items-center justify-center border outline cursor-pointer">
                <div className="flex gap-2 flex-col items-center justify-center">
                  <Spinner color="purple" classname="w-6 h-6" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border rounded cursor-pointer">
                <form
                  onSubmit={handleSubmit((data) => {
                    mutation.mutate(data);
                  })}
                  className="p-2 h-full w-full flex flex-col gap-2 justify-center"
                >
                  <div className="w-full flex gap-2 items-center justify-center">
                    <Input
                      {...register("url")}
                      autoComplete="off"
                      className="focus-visible:ring-0 text-black dark:text-white"
                    />
                    <Button variant={"default"} type="submit">
                      <ArrowBigRight />
                    </Button>
                  </div>
                  <span className="h-4 px-2 text-base font-semibold text-red-600">
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

// <Card
//     className="w-full h-full flex flex-col items-center justify-center border outline cursor-pointer"
// >
//     <CardContent className="flex gap-2 flex-col items-center justify-center">
//         <div className="flex text-green-900 gap-2 items-center justify-center">
//             <BadgeCheck />
//             Uploaded successfully
//         </div>
//         <Button
//             asChild variant={"outline"}
//             className="flex gap-1 items-center justify-center border-2 text-gray-700 hover:text-gray-800"
//         >
//             <Link
//                 href={`/documents/1234567ytrewq2345tgfd`} target="_blank"
//                 onClick={() => {
//                     setFile(null)
//                 }}
//             >
//                 Start chatting with your pdf document
//                 <ArrowBigRight size={20} />
//             </Link>
//         </Button>
//     </CardContent>
// </Card>
