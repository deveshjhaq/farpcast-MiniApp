export function shareToWarpcast(text, url) {
  // Add referral param if it's a URL from this app
  let finalUrl = url;
  if (url && url.includes(window.location.hostname)) {
    const urlObj = new URL(url);
    // You can add FID here when available via SDK
    urlObj.searchParams.set('ref', 'shared');
    finalUrl = urlObj.toString();
  }
  
  const composed = encodeURIComponent([text, finalUrl ?? ""].filter(Boolean).join(" "));
  window.open(`https://warpcast.com/~/compose?text=${composed}`, "_blank");
}
