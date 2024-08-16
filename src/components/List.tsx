"use client";

import React from "react";
import { getAll } from "@/http";
import OpenCard from "@/components/OpenCard";
import { useQuery } from "@tanstack/react-query";
import { TSite } from "@/types";
import Spinner from "./Spinner";

type Props = {};

export default function List({}: Props) {
  const query = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      return await getAll();
    },
  });

  return (
    <>
      {query.isLoading && (
        <div className="p-6 flex gap-2 items-center justify-start">
          <Spinner classname="h-6 w-6" />
          <span>Loading...</span>
        </div>
      )}
      {query.data?.data.map((item: TSite) => {
        return (
          <OpenCard
            key={item.id}
            id={item.id}
            url={item.url}
            created_at={item.created_at}
          />
        );
      })}
    </>
  );
}
