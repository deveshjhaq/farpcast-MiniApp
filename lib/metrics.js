// Privacy-friendly analytics tracker
// Tracks basic events without personal data

export const MetricEvents = {
  APP_OPENED: 'opened',
  IMAGE_GENERATED: 'action_success',
  SHARED: 'shared',
  MINIAPP_ADDED: 'added_app',
  MINTED: 'minted'
};

export async function trackEvent(eventName, metadata = {}) {
  try {
    // Send event to our API route
    await fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        timestamp: Date.now(),
        metadata
      })
    });
  } catch (error) {
    // Silently fail - don't break app for metrics
    console.debug('Metrics error:', error);
  }
}
