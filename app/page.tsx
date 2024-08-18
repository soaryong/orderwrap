"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode";
import { useAccount } from "wagmi";
import useMyStore from "@/hooks/useMyStore";

export default function Home() {
  const router = useRouter();
  const { Canvas } = useQRCode();
  const { address } = useAccount();
  const { data: store } = useMyStore(address);
  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-blue-800">
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm lg:flex">
        <Image src={"/orderwrap.png"} width={200} height={80} alt={""} />
        <w3m-button />
      </div>
      {store && (
        <div className="z-10 w-full max-w-md font-mono mt-10 text-white">
          <div>
            <h1 className="scroll-m-20 text-xl mb-3 font-extrabold tracking-tight lg:text-3xl text-white">
              My Store QR Code
            </h1>
            <small>orderwrap.shop/store/{store.id}</small>
            <Canvas
              text={`https://orderwrap.shop/store/${store.id}`}
              options={{
                type: "image/jpeg",
                quality: 0.3,
                errorCorrectionLevel: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: "#010599FF",
                  light: "#ffffff",
                },
              }}
            />
          </div>
          <Button
            onClick={() => router.push("/order")}
            size={"lg"}
            className="mt-10"
          >
            Orders
          </Button>
          <h1 className="mt-10 text-lg font-bold">Store</h1>
          <h1>{store.name}</h1>
          <h1>{store.description}</h1>

          <h1 className="mt-10 text-lg font-bold">Menu</h1>
          <h1>{store.menu}</h1>
          <h1>${store.price} USDT</h1>
          <Image src={store.image} width={500} height={500} alt={""} />
        </div>
      )}

      {!store && (
        <>
          <h1 className="scroll-m-20 text-4xl mt-10 font-extrabold tracking-tight lg:text-3xl text-white">
            Make your store in seconds.
          </h1>
          <Button
            onClick={() => router.push("/make-store")}
            size={"lg"}
            className="mt-10"
          >
            Make store
          </Button>
        </>
      )}
    </main>
  );
}
