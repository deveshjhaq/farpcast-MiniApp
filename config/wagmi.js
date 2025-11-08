import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'NeonDream',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '466d639f8ace3c14e4f6ab030f51a7ad',
  chains: [base, baseSepolia],
  ssr: true,
});
