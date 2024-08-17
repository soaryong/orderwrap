"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStore from "@/hooks/useStore";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

export default function Home() {
  const params = useParams();
  const { id } = params as { id: string };
  const { address } = useAccount();
  const { data: store } = useStore(id);
  const [count, setCount] = useState("1");
  const [tip, setTip] = useState("10");
  const { data: balance } = useBalance({
    token: "0x6b175474e89094c44da98b954eedeac495271d0f",
    address: address,
  });
  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-blue-800">
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm lg:flex">
        <Image src={"/orderwrap.png"} width={200} height={80} alt={""} />
        <w3m-button />
      </div>
      {store && (
        <div className="z-10 w-full max-w-md font-mono text-white">
          <h1 className="mt-10 text-lg font-bold">Store</h1>
          <h1>{store.name}</h1>
          <h1>{store.description}</h1>

          <h1 className="mt-5 text-lg font-bold">Menu</h1>
          <h1>{store.menu}</h1>
          <h1>${store.price} USDT</h1>
          <Image src={store.image} width={500} height={500} alt={""} />
          <div className="mt-5">
            <h1>Order Count</h1>
            <Select value={count} onValueChange={setCount}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Count" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Count</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <h1>Tip</h1>
            <Select value={tip} onValueChange={setTip}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tip" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tip</SelectLabel>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h1 className="scroll-m-20 text-xl mt-2 mb-1 font-extrabold tracking-tight lg:text-3xl text-white">
              Total Price :{" "}
              {+store.price * +count + (+store.price * +count * +tip) / 100}{" "}
              USDT
            </h1>
            <Button>Order</Button> (My Balance: {balance?.formatted ?? 0})
          </div>
        </div>
      )}
      {!store && (
        <>
          <h1 className="scroll-m-20 text-4xl mt-10 font-extrabold tracking-tight lg:text-3xl text-white">
            Store Not Found.
          </h1>
        </>
      )}
    </main>
  );
}
