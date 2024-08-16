import Create from "@/components/Create";
import Header from "@/components/Header";
import OpenCard from "@/components/OpenCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="h-screen w-screen">
        <header className="z-50 h-[21%] md:h-[8%] border flex items-center justify-center">
          <Header />
        </header>
        <div className="h-[92%] w-full overflow-y-scroll">
          <div className="container py-8 mx-auto w-fit h-fit grid gap-2 grid-cols-1 grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Create />
            <OpenCard />
          </div>
        </div>
      </div>
    </main>
  );
}
