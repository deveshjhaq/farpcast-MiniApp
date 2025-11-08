import { useEffect } from 'react';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../config/wagmi';
import { sdk } from '@farcaster/miniapp-sdk';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      try { 
        await sdk.actions.ready(); 
      } catch (e) { 
        console.error(e); 
      }
    })();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}