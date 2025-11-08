# 🌟 NeonDream — AI Image Generator & NFT MiniApp

<div align="center">
  <h3>Generate stunning AI visuals with cybernetic precision</h3>
  <p>A futuristic Farcaster MiniApp built with Next.js for creating and minting AI-generated images with Web3 integration</p>
</div>

---

## 📖 Overview

**NeonDream** is a modern, full-stack Farcaster MiniApp built with Next.js that harnesses the power of multiple AI image generation models. It features a sleek, cyberpunk-inspired UI with neon aesthetics, Web3 wallet integration, and provides an intuitive interface for creating stunning AI-generated artwork and minting them as NFTs on the Base network.

### ✨ Key Features

- 🎨 **Multiple AI Models** — Support for 7 different AI engines (Flux, Turbo, Midjourney, Llama, OpenAI, Pollination, and Dreamweaver)
- 🖼️ **Flexible Aspect Ratios** — Generate images in 7 different aspect ratios (1:1, 9:16, 16:9, 4:3, 3:4, 2:3, 3:2)
- ⚙️ **Advanced Controls** — Fine-tune generation with seed, steps, guidance, enhancement, and safety settings
- 🎭 **Cyberpunk UI** — Beautiful neon-themed interface with smooth animations and responsive design
- 🌐 **Farcaster MiniApp** — Integrated with Farcaster MiniApp SDK for seamless in-app experience
- 💎 **NFT Minting** — Mint your AI-generated images as NFTs directly on Base network
- 🦄 **Wallet Integration** — RainbowKit-powered Web3 wallet connection with WalletConnect support
- 🎯 **Base Network Support** — Deploy and mint NFTs on Base and Base Sepolia chains
- 📤 **Share to Warpcast** — Instantly share your creations to Warpcast (Farcaster's client)
- ⚡ **Serverless Architecture** — Built-in API route for efficient image generation
- 🚀 **Easy Deployment** — One-click deployment to Vercel
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile devices

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- **WalletConnect Project ID** (required for wallet features) — Get one free at [WalletConnect Cloud](https://cloud.walletconnect.com/)
- **(Optional)** Base wallet for NFT minting features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deveshjhaq/farpcast-MiniApp.git
   cd farpcast-MiniApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure WalletConnect (Required for Web3 features)**
   - Create a free account at [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project to get your Project ID
   - Update the `projectId` in `config/wagmi.js`:
     ```javascript
     export const config = getDefaultConfig({
       appName: 'NeonDream',
       projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your Project ID
       chains: [base, baseSepolia],
       ssr: true,
     });
     ```

4. **(Optional) Configure NFT Minting**
   - Deploy an ERC-721 NFT contract on Base network (or use a protocol like Zora)
   - Update `NFT_CONTRACT_ADDRESS` in `utils/nft.js` with your contract address
   - Implement IPFS upload functionality in `uploadToIPFS()` function (use NFT.Storage, Pinata, or Web3.Storage)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

---

## 🎮 Usage Guide

### Connecting Your Wallet

1. **Click "Connect Wallet"** in the top right corner
2. **Select your wallet** from the RainbowKit modal (MetaMask, Coinbase Wallet, WalletConnect, etc.)
3. **Approve the connection** in your wallet
4. Your wallet address will be displayed once connected

### Creating Your First Image

1. **Enter a prompt** — Describe your vision in detail in the "Cyber Prompt" field
2. **Select an AI model** — Choose from 7 different neural engines
3. **Configure settings** — Adjust aspect ratio, steps, guidance, and other parameters
4. **Generate** — Click the "Generate" button and watch the magic happen!

### Minting Your Image as an NFT

1. **Generate an image** using the steps above
2. **Connect your wallet** (if not already connected)
3. **Click "Mint on Base"** button below the generated image
4. **Approve the transaction** in your wallet (includes a small mint fee)
5. **Track your transaction** on BaseScan via the provided link
6. Your NFT will be minted to your connected wallet address!

### Sharing to Warpcast

1. **Generate an image** you want to share
2. **Click "Share to Warpcast"** button
3. The image URL will be **copied to your clipboard**
4. **Open Warpcast** and paste to create your cast

### Example Prompts

```
"A neon-lit cyberpunk cityscape at night, raining, with holographic advertisements reflecting on wet streets, 4k hyper-detailed, cinematic lighting"

"Futuristic robot portrait, chrome finish, glowing blue eyes, intricate mechanical details, dramatic lighting"

"Abstract digital art, flowing neon colors, purple and cyan gradients, geometric patterns, 8k resolution"
```

---

## 🤖 Supported AI Models

| Model | Key | Best For | Advanced Controls |
|-------|-----|----------|-------------------|
| **Flux** | `flux` | High-quality, detailed images | ✅ Full control |
| **Turbo** | `turbo` | Fast generation | ✅ Full control |
| **Midjourney** | `midjourney` | Artistic, creative outputs | ✅ Full control |
| **Llama** | `llama` | Versatile generation | ✅ Full control |
| **OpenAI** | `openai` | Consistent, reliable results | ✅ Full control |
| **Pollination** | `pollination` | Simple prompt-based | ❌ Prompt only |
| **Dreamweaver** | `dreamweaver` | Specialized effects | ❌ Prompt only |

---

## ⚙️ Configuration Options

### Generation Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | required | Detailed description of the desired image |
| `model` | string | `flux` | AI model to use for generation |
| `ratio` | string | `1:1` | Aspect ratio (1:1, 9:16, 16:9, 4:3, 3:4, 2:3, 3:2) |
| `seed` | string | random | Seed for reproducible results (optional) |
| `steps` | number | `50` | Number of generation iterations (more = higher quality) |
| `guidance` | number | `7.5` | Creativity control (lower = more creative, higher = more literal) |
| `enhance` | boolean | `true` | Enable quantum enhancement |
| `safe` | boolean | `false` | Enable safety protocol |

**Note:** `seed`, `steps`, `guidance`, `enhance`, and `safe` parameters are only available for models other than Pollination and Dreamweaver.

### Web3 & Wallet Configuration

| Configuration | File | Description |
|---------------|------|-------------|
| **WalletConnect Project ID** | `config/wagmi.js` | Required for wallet connection. Get free at [WalletConnect Cloud](https://cloud.walletconnect.com/) |
| **Supported Chains** | `config/wagmi.js` | Base and Base Sepolia networks configured by default |
| **NFT Contract Address** | `utils/nft.js` | ERC-721 contract address for minting (placeholder by default) |
| **NFT Contract ABI** | `utils/nft.js` | Standard ERC-721 mint function interface |
| **IPFS Upload** | `utils/nft.js` | Placeholder function - integrate with NFT.Storage, Pinata, or Web3.Storage |

### NFT Minting Setup

To enable NFT minting functionality:

1. **Deploy an NFT Contract** or use a protocol like [Zora](https://zora.co/)
   - The contract should implement a `mint(address to, string uri)` payable function
   - Deploy on Base or Base Sepolia network
   
2. **Update Contract Address** in `utils/nft.js`:
   ```javascript
   export const NFT_CONTRACT_ADDRESS = '0xYourContractAddress';
   ```

3. **Configure IPFS Storage** in `utils/nft.js`:
   - Sign up for [NFT.Storage](https://nft.storage/), [Pinata](https://pinata.cloud/), or [Web3.Storage](https://web3.storage/)
   - Implement the `uploadToIPFS()` function with your API key
   - Example with NFT.Storage:
   ```javascript
   import { NFTStorage } from 'nft.storage';
   
   export async function uploadToIPFS(imageDataUrl, metadata) {
     const client = new NFTStorage({ token: 'YOUR_NFT_STORAGE_API_KEY' });
     const base64Data = imageDataUrl.split(',')[1];
     const blob = base64ToBlob(base64Data, 'image/png');
     
     // Upload image
     const imageCid = await client.storeBlob(blob);
     
     // Create metadata with IPFS image URL
     const metadataWithImage = {
       ...metadata,
       image: `ipfs://${imageCid}`
     };
     
     // Upload metadata
     const metadataBlob = new Blob([JSON.stringify(metadataWithImage)], { type: 'application/json' });
     const metadataCid = await client.storeBlob(metadataBlob);
     
     return `ipfs://${metadataCid}`;
   }
   ```

4. **Adjust Mint Price** (if needed):
   ```javascript
   value: parseEther('0.001'), // Change the mint price in ETH
   ```

---

## 🏗️ Project Structure

```
farpcast-MiniApp/
├── pages/
│   ├── _app.jsx           # Global app wrapper with Web3 providers (Wagmi, RainbowKit, React Query)
│   ├── index.jsx          # Main UI component with wallet connection and minting features
│   └── api/
│       └── generate.js    # Serverless API endpoint for image generation
├── config/
│   └── wagmi.js           # Wagmi configuration for Base network and WalletConnect
├── utils/
│   └── nft.js             # NFT minting utilities (contract ABI, IPFS upload)
├── styles/
│   └── globals.css        # Global styles with cyberpunk theme
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

---

## 🔌 API Reference

### POST `/api/generate`

Generate an AI image based on provided parameters.

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains",
  "model": "flux",
  "ratio": "16:9",
  "seed": "12345",
  "steps": 50,
  "guidance": 7.5,
  "enhance": "true",
  "safe": "false"
}
```

**Success Response:**
```json
{
  "success": true,
  "dataUrl": "data:image/png;base64,...",
  "mimeType": "image/png",
  "details": {
    "Neural Engine": "Flux",
    "Prompt": "A beautiful sunset over mountains",
    "Aspect Ratio": "16:9",
    "Resolution": "1920 × 1080 px",
    "Seed": "12345",
    "Iterations": 50,
    "Creativity Control": 7.5,
    "Quantum Enhance": "Enabled",
    "Safety Protocol": "Disabled"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will auto-detect Next.js configuration

3. **Configure (Optional)**
   - Update `config/wagmi.js` with your WalletConnect Project ID before deploying
   - For NFT minting, configure your contract address and IPFS provider

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

### Environment Variables

The following environment variables can be configured in Vercel's dashboard (optional):

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud Project ID | No* |
| `NFT_STORAGE_API_KEY` | NFT.Storage API key for IPFS uploads | No |
| `PINATA_API_KEY` | Pinata API key for IPFS uploads | No |

\* The Project ID is currently hardcoded in `config/wagmi.js`. For production, consider moving it to an environment variable.

**Note:** For IPFS and NFT contract integration, you'll need to implement the upload functionality in `utils/nft.js` and set the appropriate environment variables.

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) — React framework with server-side rendering
- **UI Library:** [React 18](https://react.dev/) — Modern JavaScript UI library
- **Styling:** CSS3 with custom properties — Cyberpunk-themed design system
- **API:** Next.js Serverless Functions — Built-in API routes
- **Web3 Stack:**
  - [Wagmi 2.x](https://wagmi.sh/) — React Hooks for Ethereum
  - [Viem](https://viem.sh/) — TypeScript Interface for Ethereum
  - [RainbowKit](https://www.rainbowkit.com/) — Wallet connection UI
  - [TanStack Query](https://tanstack.com/query) — Async state management
- **Blockchain:** [Base](https://base.org/) & Base Sepolia — Layer 2 networks for NFT minting
- **Farcaster:** [@farcaster/miniapp-sdk](https://docs.farcaster.xyz/) — MiniApp integration
- **Deployment:** [Vercel](https://vercel.com/) — Optimized for Next.js apps

---

## 🔧 Troubleshooting

### Common Issues

**Issue: Port 3000 already in use**
```bash
# Use a different port
PORT=3001 npm run dev
```

**Issue: Images not generating**
- Check your internet connection
- Verify the external API endpoints are accessible
- Try a different AI model

**Issue: Generation timeout**
- Reduce the number of steps
- Try a faster model like "Turbo"
- Check network connectivity

**Issue: Large file error during deployment**
- Ensure `node_modules` is in `.gitignore`
- Don't commit build artifacts or dependencies

**Issue: Wallet won't connect**
- Ensure you have configured a valid WalletConnect Project ID in `config/wagmi.js`
- Check that you're using a supported wallet (MetaMask, Coinbase Wallet, WalletConnect-compatible wallets)
- Try refreshing the page and reconnecting
- Make sure your wallet is on the correct network (Base or Base Sepolia)

**Issue: NFT minting fails**
- Verify you have configured `NFT_CONTRACT_ADDRESS` in `utils/nft.js`
- Ensure you have enough ETH in your wallet for the mint price + gas fees
- Check that you're connected to the correct network (Base or Base Sepolia)
- Verify the contract address is correct and deployed on the connected network
- Make sure you've implemented the `uploadToIPFS()` function if using a real NFT contract

**Issue: Farcaster MiniApp features not working**
- Verify the app is being opened within a Farcaster client that supports MiniApps
- Check the browser console for any Farcaster SDK initialization errors
- Some features may only work when the app is opened from within Farcaster

**Issue: Share to Warpcast button doesn't work**
- The button copies the image URL to clipboard - make sure clipboard permissions are granted
- After copying, manually open Warpcast and paste the content
- Try using a different browser if clipboard access is blocked

---

## 📝 Development Notes

### API Timeout

The serverless function uses a 120-second upstream timeout. Vercel serverless functions have execution limits. For longer-running jobs, consider:
- Using an external worker service
- Implementing a queue system
- Breaking down into smaller tasks

### Image Handling

Images are returned as base64 data URLs, which increases response size. For production use with many or very large images, consider:
- Streaming images directly
- Using temporary storage (S3, Cloudinary)
- Implementing CDN caching

### External Services

The app proxies requests to external image generation endpoints. These services may have:
- Rate limits
- Downtime
- Different behavior per endpoint

Test thoroughly, especially with Pollination and Dreamweaver endpoints.

### Farcaster MiniApp Integration

The app uses the Farcaster MiniApp SDK for integration:
- **SDK Initialization:** The `sdk.actions.ready()` call in `useEffect` notifies the Farcaster client that the app is ready
- **Context:** When opened within Farcaster, the app has access to user context and can interact with the Farcaster ecosystem
- **Standalone Mode:** The app also works as a standalone web application outside of Farcaster

### Web3 & Wallet Features

The app uses modern Web3 libraries for blockchain interaction:
- **Wagmi:** Provides React hooks for wallet connection, contract interaction, and transaction management
- **RainbowKit:** Beautiful, customizable wallet connection UI
- **Viem:** Efficient TypeScript library for Ethereum interactions (replaces ethers.js)
- **Base Network:** Optimized for low-cost NFT minting with faster transactions

### NFT Minting Architecture

The current implementation provides:
- **Contract Interface:** Standard ERC-721 mint function ABI
- **IPFS Placeholder:** Ready to integrate with NFT.Storage, Pinata, or Web3.Storage
- **Transaction Tracking:** Uses Wagmi's `useWaitForTransactionReceipt` for real-time status
- **User Feedback:** Loading states and success/error messages

For production use:
1. Deploy a proper NFT contract (or use Zora protocol)
2. Implement actual IPFS upload with a provider API key
3. Consider adding metadata standards (OpenSea, etc.)
4. Add error handling for network issues

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Test your changes thoroughly
- Update documentation as needed
- Keep commits atomic and well-described

---

## 🔒 Security

- **Never commit API keys** or secrets to the repository
- Use Vercel environment variables for sensitive data
- The safety protocol option helps filter inappropriate content
- External APIs may have their own content policies
- **Wallet Security:** Always verify transaction details before approving in your wallet
- **Smart Contract Security:** Audit any custom NFT contracts before deployment
- **IPFS Uploads:** Ensure uploaded content complies with terms of service

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 👨‍💻 Author

**Devesh Jhaq**
- GitHub: [@deveshjhaq](https://github.com/deveshjhaq)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All AI model providers for their APIs
- Farcaster team for the MiniApp SDK
- RainbowKit, Wagmi, and Viem teams for excellent Web3 tooling
- Base network for providing a fast, low-cost L2 solution
- The open-source community

---

<div align="center">
  <p>Made with ❤️ and ⚡ by Devesh Jhaq</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>