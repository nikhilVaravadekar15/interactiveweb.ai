"use client";

import React from "react";
import Link from "next/link";
import { TSite } from "@/types";
import { Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { deleteUrlById } from "@/http";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OpenCard({ id, url, created_at }: TSite) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteUrlById(id);
    },
    onSuccess: (response) => {
      toast({
        variant: "default",
        title: "Successfully deleted",
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
  });

  return (
    <Card
      key={id}
      className="text-ellipsis h-[192px] w-[256px] border shadow-sm cursor-pointer hover:shadow-lg hover:border-gray-200"
    >
      <CardHeader>
        <Link
          href={`/u/${id}`}
          className="overflow-hidden w-full hover:text-blue-900"
        >
          <CardTitle className="tw-full ext-wrap text-xl font-bold" title={url}>
            {url.length > 64 ? url.substring(0, 256) : url}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 break-words flex flex-col">
            <span>{new Date(created_at).toUTCString()}</span>
          </span>
          <Button
            onClick={() => {
              mutation.mutate(id);
            }}
            variant="outline"
            className="rounded-full bg-red-100 hover:bg-red-200"
          >
            <Trash2 color="red" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
