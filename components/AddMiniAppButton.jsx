import { sdk } from "@farcaster/miniapp-sdk";
import { trackEvent, MetricEvents } from "../lib/metrics";

export default function AddMiniAppButton() {
  const handleClick = () => {
    sdk.actions.addMiniApp();
    trackEvent(MetricEvents.MINIAPP_ADDED);
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Add to Farcaster
    </button>
  );
}
