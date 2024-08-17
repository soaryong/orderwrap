// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const projectId = "8d5217388f123bbeffad04b2c2648b13";

const metadata = {
  name: "OrderWrap",
  description: "AppKit Example",
  url: "https://orderwrap.shop",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  auth: {
    email: false, // default to true
    socials: ["google", "x", "facebook"],
    showWallets: false, // default to true
    walletFeatures: true, // default to true
  },
});
