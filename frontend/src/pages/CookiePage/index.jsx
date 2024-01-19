import React from "react";
import "./style.css";

import { useReward } from "react-rewards";

const CookiePage = () => {
  const { reward: confettiReward, isAnimating } = useReward(
    "rewardId",
    "emoji",
    {
      emoji: ["🍪"],
      elementSize: 20,
      elementCount: 40,
      decay: 0.92,
      spread: 70,
      zIndex: 999,
      position: "fixed",
    }
  );

  return (
    <main className="cookies-page">
      <div>
        <button
          className="cookie-button"
          disabled={isAnimating}
          onClick={() => {
            confettiReward();
          }}
        >
          <span id="rewardId" className="rewardId" />
          🍪
        </button>
      </div>
    </main>
  );
};

export default CookiePage;
