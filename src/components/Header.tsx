import React from "react";
import Link from "next/link";
import Image from "next/image";

export default React.memo(function Header() {
  return (
    <nav className="w-full h-full border-gray-200 px-4 lg:px-6 py-2.5 shadow dark:bg-gray-800 dark:shadow-white">
      <div className="flex gap-4 flex-wrap flex-col items-center justify-center mx-auto max-w-screen-xl md:flex-row md:justify-between">
        <Link href={"/"} className="group flex items-center cursor-pointer">
          <Image
            src={"/favicon.png"}
            className="mr-3"
            alt="interactiveweb.ai-logo"
            width={32}
            height={32}
            draggable={false}
          />
          <span className="text-xl font-bold dark:text-white">
            Interactiveweb.ai
          </span>
        </Link>
      </div>
    </nav>
  );
});
