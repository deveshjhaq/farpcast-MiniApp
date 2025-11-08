import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS, uploadToIPFS } from '../utils/nft';
import { sdk } from "@farcaster/miniapp-sdk";
import AddMiniAppButton from '../components/AddMiniAppButton';
import { shareToWarpcast } from '../lib/share';
import { trackEvent, MetricEvents } from '../lib/metrics';

const MODEL_MAP = {
  flux: 'Flux',
  turbo: 'Turbo',
  midjourney: 'midjourney',
  llama: 'llama',
  openai: 'openai',
  pollination: 'Pollination',
  dreamweaver: 'Dreamweaver'
};

const RATIOS = {
  '1:1': { width: 1024, height: 1024 },
  '9:16': { width: 768, height: 1366 },
  '16:9': { width: 1920, height: 1080 },
  '4:3': { width: 1024, height: 768 },
  '3:4': { width: 768, height: 1024 },
  '2:3': { width: 800, height: 1200 },
  '3:2': { width: 1200, height: 800 }
};

export default function Home() {
  useEffect(() => {
    // Track app opened
    trackEvent(MetricEvents.APP_OPENED);
  }, []);

  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isMinting } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [form, setForm] = useState({
    prompt: 'A neon-lit cyberpunk cityscape at night, raining, with holographic advertisements reflecting on wet streets, 4k hyper-detailed, cinematic lighting...',
    model: 'flux',
    ratio: '1:1',
    seed: '',
    steps: 50,
    guidance: 7.5,
    enhance: 'true',
    safe: 'false'
  });

  const [loading, setLoading] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [error, setError] = useState('');
  const [details, setDetails] = useState({});

  const promptOnly = ['pollination', 'dreamweaver'].includes(form.model);

  function updateField(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setImageDataUrl('');
    if (!form.prompt || form.prompt.trim() === '') {
      setError('Prompt cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await resp.json();
      if (!resp.ok || !data.success) {
        setError(data.error || 'Generation failed');
      } else {
        setImageDataUrl(data.dataUrl);
        setDetails(data.details || {});
        trackEvent(MetricEvents.IMAGE_GENERATED, { model: form.model });
      }
    } catch (err) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    shareToWarpcast("I just created this on NeonDream!", imageDataUrl);
    trackEvent(MetricEvents.SHARED);
  }

  async function handleMint() {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    if (!imageDataUrl) {
      alert('No image to mint!');
      return;
    }

    try {
      // Upload image to IPFS
      const metadata = {
        name: 'NeonDream AI Art',
        description: form.prompt,
        image: imageDataUrl,
        attributes: [
          { trait_type: 'Model', value: MODEL_MAP[form.model] || form.model },
          { trait_type: 'Aspect Ratio', value: form.ratio },
        ]
      };

      const ipfsUri = await uploadToIPFS(imageDataUrl, metadata);
      
      // Note: NFT_CONTRACT_ADDRESS must be set to a valid contract
      if (NFT_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
        alert('⚠️ NFT contract not configured!\n\nTo enable minting:\n1. Deploy an ERC-721 contract on Base\n2. Update NFT_CONTRACT_ADDRESS in utils/nft.js\n3. Configure IPFS upload in uploadToIPFS function\n\nFor now, this is a demonstration of the minting UI.');
        return;
      }

      // Mint the NFT
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mint',
        args: [address, ipfsUri],
        value: parseEther('0.001'), // 0.001 ETH mint price (adjust as needed)
      });
      trackEvent(MetricEvents.MINTED);
    } catch (err) {
      console.error('Minting error:', err);
      alert(`Failed to mint: ${err.message}`);
    }
  }

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 className="logo glow">NeonDream</h1>
            <p className="tagline">Generate stunning AI visuals with cybernetic precision. Push the boundaries of digital creativity.</p>
          </div>
          <div className="wallet-connect-wrapper">
            <ConnectButton />
          </div>
        </div>
      </header>

      <div className="main-card">
        <form id="imageForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="prompt">
              Cyber Prompt
              <span className="tooltip info-icon" title="Describe your vision in detail. Include style, composition, and mood for best results.">
                <i className="fas fa-question-circle"></i>
              </span>
            </label>
            <textarea
              id="prompt"
              name="prompt"
              className="prompt-input"
              value={form.prompt}
              onChange={e => updateField('prompt', e.target.value)}
              required
              rows={6}
            />
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Neural Engine</label>
              <select
                className="input-field"
                value={form.model}
                onChange={e => updateField('model', e.target.value)}
              >
                {Object.keys(MODEL_MAP).map(key => (
                  <option key={key} value={key}>
                    {MODEL_MAP[key]} ({key})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-col">
              <label>Aspect Ratio</label>
              <select
                className="input-field"
                value={form.ratio}
                onChange={e => updateField('ratio', e.target.value)}
              >
                {Object.keys(RATIOS).map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`form-row ${promptOnly ? 'prompt-only-disabled' : ''}`}>
            <div className="form-col">
              <label>Seed</label>
              <input
                className="input-field"
                value={form.seed}
                onChange={e => updateField('seed', e.target.value)}
                placeholder="Optional seed (leave blank for random)"
              />
            </div>

            <div className="form-col">
              <label>Iterations (steps)</label>
              <input
                type="number"
                className="input-field"
                value={form.steps}
                onChange={e => updateField('steps', Number(e.target.value))}
              />
            </div>
          </div>

          <div className={`form-row ${promptOnly ? 'prompt-only-disabled' : ''}`}>
            <div className="form-col">
              <label>Creativity Control (guidance)</label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={form.guidance}
                onChange={e => updateField('guidance', Number(e.target.value))}
              />
            </div>

            <div className="form-col">
              <label>Enhance</label>
              <select
                className="input-field"
                value={form.enhance}
                onChange={e => updateField('enhance', e.target.value)}
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </div>
          </div>

          <div className={`form-row ${promptOnly ? 'prompt-only-disabled' : ''}`}>
            <div className="form-col">
              <label>Safety Protocol</label>
              <select
                className="input-field"
                value={form.safe}
                onChange={e => updateField('safe', e.target.value)}
              >
                <option value="false">Disabled</option>
                <option value="true">Enabled</option>
              </select>
            </div>
            <div className="form-col" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
                {loading ? 'Generating…' : 'Generate'}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="error-message" role="alert">{error}</div>
        )}
      </div>

      <div className="result-container" style={{ display: imageDataUrl ? 'block' : 'none' }}>
        <div className="result-header">
          <div className="result-title">NeonDream Result</div>
        </div>
        {imageDataUrl && <img src={imageDataUrl} alt="Generated" className="result-image" />}
        {imageDataUrl && (
          <div className="share-section">
            <button 
              className="btn btn-share" 
              onClick={handleShare}
            >
              Share to Warpcast
            </button>
            <button 
              className="btn btn-mint" 
              onClick={handleMint}
              disabled={!isConnected || isMinting || isConfirming}
            >
              {isMinting || isConfirming ? 'Minting...' : isConfirmed ? '✓ Minted!' : 'Mint on Base'}
            </button>
            <AddMiniAppButton />
          </div>
        )}
        {isConfirmed && hash && (
          <div className="mint-success">
            ✓ NFT Minted! Transaction: <a href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noopener noreferrer">{hash.slice(0, 10)}...</a>
          </div>
        )}
        {imageDataUrl && (
          <div className="result-details">
            <div><strong>Neural Engine:</strong> {MODEL_MAP[form.model] || form.model}</div>
            <div><strong>Prompt:</strong> {form.prompt}</div>
            <div><strong>Aspect Ratio:</strong> {form.ratio}</div>
            <div><strong>Resolution:</strong> {RATIOS[form.ratio].width} × {RATIOS[form.ratio].height} px</div>
            {!promptOnly && (
              <>
                <div><strong>Seed:</strong> {form.seed || 'Random'}</div>
                <div><strong>Iterations:</strong> {form.steps}</div>
                <div><strong>Creativity Control:</strong> {form.guidance}</div>
                <div><strong>Quantum Enhance:</strong> {form.enhance === 'true' ? 'Enabled' : 'Disabled'}</div>
                <div><strong>Safety Protocol:</strong> {form.safe === 'true' ? 'Enabled' : 'Disabled'}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}