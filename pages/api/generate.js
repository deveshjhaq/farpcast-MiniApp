// Serverless API route to proxy image-generation requests.
// This endpoint returns JSON: { success: true, dataUrl, mimeType, details } or { success: false, error }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body;

    // If body is a JSON string (some setups), parse it
    const payload = typeof body === 'string' ? JSON.parse(body) : body;

    const {
      prompt = '',
      model = 'flux',
      ratio = '1:1',
      seed = '',
      steps = 50,
      guidance = 7.5,
      enhance = 'true',
      safe = 'false'
    } = payload;

    if (!prompt || prompt.trim() === '') {
      res.status(400).json({ success: false, error: 'Prompt cannot be empty' });
      return;
    }

    const RATIOS = {
      '1:1': { width: 1024, height: 1024 },
      '9:16': { width: 768, height: 1366 },
      '16:9': { width: 1920, height: 1080 },
      '4:3': { width: 1024, height: 768 },
      '3:4': { width: 768, height: 1024 },
      '2:3': { width: 800, height: 1200 },
      '3:2': { width: 1200, height: 800 }
    };

    if (!RATIOS[ratio]) {
      res.status(400).json({ success: false, error: 'Invalid ratio' });
      return;
    }

    const MODEL_MAP = {
      flux: 'Flux',
      turbo: 'Turbo',
      midjourney: 'midjourney',
      llama: 'llama',
      openai: 'openai',
      pollination: 'Pollination',
      dreamweaver: 'Dreamweaver'
    };

    const apiModel = MODEL_MAP[model.toLowerCase()] || 'Flux';
    const encodedPrompt = encodeURIComponent(prompt);

    let apiUrl = '';
    if (model === 'pollination') {
      apiUrl = `https://botmaker.serv00.net/pollination.php?prompt=${encodedPrompt}`;
    } else if (model === 'dreamweaver') {
      apiUrl = `https://botfather.cloud/Apis/ImgGen/client.php?inputText=${encodedPrompt}`;
    } else {
      const qs = new URLSearchParams({
        model: apiModel,
        width: String(RATIOS[ratio].width),
        height: String(RATIOS[ratio].height),
        steps: String(steps),
        guidance: String(guidance),
        enhance: String(enhance),
        safe: String(safe)
      });
      apiUrl = `https://image.hello-kaiiddo.workers.dev/${encodedPrompt}?${qs.toString()}`;
    }

    // Use fetch with AbortController to set a timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 120s timeout

    let upstreamResp;
    try {
      upstreamResp = await fetch(apiUrl, { signal: controller.signal });
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        res.status(504).json({ success: false, error: 'Upstream request timed out' });
      } else {
        res.status(502).json({ success: false, error: 'Upstream request failed' });
      }
      return;
    } finally {
      clearTimeout(timeout);
    }

    if (!upstreamResp.ok) {
      const text = await upstreamResp.text().catch(() => '');
      res.status(502).json({ success: false, error: `Upstream returned ${upstreamResp.status}`, details: text });
      return;
    }

    const contentType = upstreamResp.headers.get('content-type') || '';

    if (!contentType.startsWith('image/')) {
      // Return the text body as error
      const text = await upstreamResp.text().catch(() => '');
      res.status(502).json({ success: false, error: 'API did not return an image', details: text });
      return;
    }

    // Read binary as arrayBuffer -> base64
    const buffer = await upstreamResp.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    const base64 = Buffer.from(binary, 'binary').toString('base64');
    const dataUrl = `data:${contentType};base64,${base64}`;

    // Prepare details
    const details = {
      'Neural Engine': apiModel,
      'Prompt': prompt,
      'Aspect Ratio': ratio,
      'Resolution': `${RATIOS[ratio].width} × ${RATIOS[ratio].height} px`
    };

    if (!['pollination', 'dreamweaver'].includes(model)) {
      details['Seed'] = seed || 'Random';
      details['Iterations'] = steps;
      details['Creativity Control'] = guidance;
      details['Quantum Enhance'] = enhance === 'true' ? 'Enabled' : 'Disabled';
      details['Safety Protocol'] = safe === 'true' ? 'Enabled' : 'Disabled';
    }

    res.status(200).json({ success: true, dataUrl, mimeType: contentType, details });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}