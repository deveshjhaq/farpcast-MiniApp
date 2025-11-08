// Simple NFT contract ABI for minting
// This is a standard ERC-721 mint function
export const NFT_CONTRACT_ABI = [
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'uri', type: 'string' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mintPrice',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

// Example NFT contract address on Base (users should deploy their own or use Zora)
// This is a placeholder - users need to deploy their own NFT contract or use a protocol like Zora
export const NFT_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Upload image to IPFS via NFT.Storage or similar service
 * For now, this is a placeholder - users can integrate with NFT.Storage, Pinata, or Web3.Storage
 */
export async function uploadToIPFS(imageDataUrl, metadata) {
  // In a real implementation, you would:
  // 1. Convert base64 to blob
  // 2. Upload to IPFS via NFT.Storage or Pinata
  // 3. Return the IPFS URI
  
  // For now, return a mock IPFS URI
  // Users should implement this with their preferred IPFS provider
  const base64Data = imageDataUrl.split(',')[1];
  const blob = base64ToBlob(base64Data, 'image/png');
  
  // TODO: Implement actual IPFS upload
  // Example with NFT.Storage:
  // const client = new NFTStorage({ token: YOUR_API_KEY });
  // const cid = await client.storeBlob(blob);
  // return `ipfs://${cid}`;
  
  console.log('Image size:', blob.size, 'bytes');
  console.log('Metadata:', metadata);
  
  // Return a placeholder IPFS URI
  // In production, this should be replaced with actual IPFS upload
  return `ipfs://QmPlaceholder${Date.now()}`;
}

function base64ToBlob(base64, contentType = '') {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
