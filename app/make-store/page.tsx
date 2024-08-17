import { MakeStore } from "@/components/make-store";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-20 bg-blue-800">
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm lg:flex">
        <Image src={"/orderwrap.png"} width={200} height={80} alt={""} />
        <w3m-button />
      </div>

      <div className="z-10 w-full max-w-md font-mono mt-10 text-white">
        <MakeStore />
      </div>
    </main>
  );
}
