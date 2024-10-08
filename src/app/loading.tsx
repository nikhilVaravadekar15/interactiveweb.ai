import React from "react";
import Spinner from "@/components/Spinner";

export default function loading() {
  return (
    <div className="h-[96vh] w-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
