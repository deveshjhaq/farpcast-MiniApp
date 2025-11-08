export function shareToWarpcast(text, url) {
  const composed = encodeURIComponent([text, url ?? ""].filter(Boolean).join(" "));
  window.open(`https://warpcast.com/~/compose?text=${composed}`, "_blank");
}
