// Simple metrics API endpoint
// In production, connect this to your database or analytics service

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, timestamp, metadata } = req.body;
    
    // Log to console for now
    // In production, save to database or send to analytics service
    console.log('Metric:', {
      event,
      timestamp: new Date(timestamp).toISOString(),
      metadata
    });
    
    // TODO: Save to database
    // await db.metrics.create({ event, timestamp, metadata });
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Metrics error:', error);
    return res.status(500).json({ error: 'Failed to track metric' });
  }
}
