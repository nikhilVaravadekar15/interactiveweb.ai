"use client";

import React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

export default function OpenCard({}: Props) {
  return (
    <Card className="h-[192px] w-[256px] border shadow-sm cursor-pointer hover:shadow-lg hover:border-gray-200">
      <CardHeader>
        <Link href={`/vu/123`} className="break-words hover:text-blue-900">
          <CardTitle className="text-xl font-bold">some url</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 break-words flex flex-col">
            <span>Aug 10, 2024</span>
          </span>
          <Button
            // onClick={() => {}}
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
