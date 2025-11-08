import { sdk } from "@farcaster/miniapp-sdk";
import { createWalletClient, custom } from "viem";

export async function getWalletClient(chain) {
  const provider = await sdk.wallet.getEthereumProvider();
  
  return createWalletClient({
    chain,
    transport: custom(provider)
  });
}
