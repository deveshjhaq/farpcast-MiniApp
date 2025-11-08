import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'NeonDream',
  projectId: '466d639f8ace3c14e4f6ab030f51a7ad', // Users should replace this with their WalletConnect project ID
  chains: [base, baseSepolia],
  ssr: true,
});
