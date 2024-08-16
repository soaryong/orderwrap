"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode";

export default function Home() {
  const router = useRouter();
  const { Canvas } = useQRCode();
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

      {store && (
        <div>
          <div>
            Please use this QR code to access the store.
            <Canvas
              text={`https://orderwrap.web.app/store/${store.id}`}
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
          <h1>{store.name}</h1>
          <h1>{store.menu}</h1>
          <h1>{store.descriptioin}</h1>
          <Image src={store.image} width={500} height={500} alt={""} />
          <h1>{store.price}</h1>
          <h1>url : https://orderwrap.web.app/store/{store.id}</h1>
        </div>
      )}

      {!store && (
        <Button onClick={() => router.push("/make-store")}>Make store</Button>
      )}
    </main>
  );
}
