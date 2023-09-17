import { useMemo, useState } from "react";

import { Marker, Popup } from "react-map-gl";

import { Pin } from "@/components/pin";
import BOUNTIES from "@/data/bounty.json";
import type { Bounty } from "@/types";
import { formatCoordinate } from "@/utils/format-coordinate";
import { Button, Icon } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

type AlertsProps = {
  viewMoreHandler: (bounty: Bounty) => void;
};

export function Alerts({ viewMoreHandler }: AlertsProps) {
  const [popupInfo, setPopupInfo] = useState<Bounty | null>(null);

  return (
    <>
      {BOUNTIES.map((bounty) => (
        <Marker
          key={bounty.label}
          longitude={bounty.longitude}
          latitude={bounty.latitude}
          anchor="bottom"
          onClick={(e: any) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(bounty);
          }}
        >
          <Pin />
        </Marker>
      ))}
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">{popupInfo.label}</h4>
            <h5 className="text-xl font-semibold">
              {formatCoordinate(popupInfo.longitude, "N", "S")},&nbsp;
              {formatCoordinate(popupInfo.latitude, "E", "W")}
            </h5>
            <p>
              Take a picture and claim <b>${popupInfo.bounty.toFixed(2)}</b> in
              cash!
            </p>
            <p>
              The urgnecy level on this body of water is{" "}
              <b>Level {popupInfo.urgency}</b>
            </p>
            <Button
              colorScheme="teal"
              size="md"
              className="m-auto w-full"
              leftIcon={<Icon as={ViewIcon} />}
              onClick={() => viewMoreHandler(popupInfo)}
            >
              View More
            </Button>
          </div>
        </Popup>
      )}
    </>
  );
}
