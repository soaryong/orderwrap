"use client";
import pb from "@/api/pocketbase";
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
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { sepolia } from "wagmi/chains";

export default function Home() {
  const minTokenAbi = [
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const params = useParams();
  const { id } = params as { id: string };
  const { address } = useAccount();
  const { data: store } = useStore(id);
  const [count, setCount] = useState("1");
  const [tip, setTip] = useState("10");
  const { data: balance } = useBalance({
    chainId: sepolia.id,
    token: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
    address: address,
  });

  const test = async () => {
    await pb.collection("order").create({
      store_id: store?.id,
      count,
      price: price(),
      customer: address,
      hash: "",
    });
  };

  const { writeContract, isPending: isLoading } = useWriteContract({
    mutation: {
      onSuccess: async (hash) => {
        await pb.collection("order").create({
          store_id: store?.id,
          count,
          price: price().toString(),
          customer: address,
          hash,
        });
        alert("Order Success");
      },
      onError: () => {
        alert("Order Failed");
      },
    },
  });

  const price = () => {
    if (!store) {
      return 0;
    }
    const price = +store.price;
    const cnt = +count;
    const percent = +tip;

    const amount = price * cnt + (price * cnt * percent) / 100;

    return amount;
  };

  const onSendTransaction = useCallback(() => {
    if (!store) {
      return;
    }

    writeContract({
      abi: minTokenAbi,
      functionName: "transfer",
      args: [store.owner, price().toString()],
      address: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
    });
  }, [writeContract]);

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
              USDC
            </h1>
            <Button onClick={onSendTransaction}>Order</Button> (My Balance:{" "}
            {balance?.formatted ?? 0})
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
