import { sdk } from "@farcaster/miniapp-sdk";

export default function AddMiniAppButton() {
  return (
    <button className="btn btn-primary" onClick={() => sdk.actions.addMiniApp()}>
      Add to Farcaster
    </button>
  );
}
