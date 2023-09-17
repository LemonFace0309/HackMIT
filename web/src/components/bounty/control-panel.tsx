import * as React from "react";

import BOUNTIES from "@/data/bounty.json";
import type { Bounty } from "@/types";

type ControlPanelProps = {
  onSelectBounty: (bounty: Bounty) => void;
};

export function ControlPanel({ onSelectBounty }: ControlPanelProps) {
  return (
    <div className="hidden md:block absolute top-0 right-0 mt-6 mr-6 shadow-md bg-white md:max-w-xs lg:max-w-sm px-6 py-3 space-y-2 md: max-h-48 lg:max-h-64 overflow-auto">
      <h3 className="text-lg">Claim Bounties</h3>
      <p className="text-sm">
        Select a location and snap a photo to claim a bounty
      </p>
      <hr />

      <div className="uppercase space-y-2">
        {BOUNTIES.map((bounty, index) => (
          <div key={`btn-${index}`} className="input">
            <input
              type="radio"
              name="city"
              className="mr-2"
              id={`city-${index}`}
              onClick={() => onSelectBounty(bounty)}
            />
            <label htmlFor={`city-${index}`}>{bounty.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
