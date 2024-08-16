"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const store = {
    id: 1,
    name: "Phed Mark",
    menu: "Phed",
    descriptioin: "Phed Mark",
    price: 100,
    image:
      "https://lh5.googleusercontent.com/p/AF1QipP4dsFswNUlKJayzgH8xVVzDlp03p038KKjIJ8w=w203-h135-k-no",
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="font-extrabold">OrderWrap</h1>
        <w3m-button />
      </div>

      <h1>{store.name}</h1>
      <h1>{store.menu}</h1>
      <h1>{store.descriptioin}</h1>
      <Image src={store.image} width={500} height={500} alt={""} />
      <h1>{store.price}</h1>

      <Button onClick={() => alert("Buy")}>Buy</Button>
    </main>
  );
}
