import { useRef, useState } from "react";
import ReactMap, {
  GeolocateControl,
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
  MapRef,
} from "react-map-gl";

import { ControlPanel } from "@/components/control-panel";
import { SlideOver } from "@/components/slide-over";
import { Pin } from "@/components/pin";
import { Bounty, Coordinate, WaterData } from "@/types";

export function Map() {
  const mapRef = useRef<MapRef>(null);
  const [selectedCord, setSelectedCord] = useState<Coordinate | null>(null);
  const [waterData, setWaterData] = useState<WaterData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 42.3601,
    longitude: -71.0942,
    zoom: 14,
  });

  const onSelectBounty = ({ longitude, latitude }: Bounty) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 18,
      duration: 2000,
    });
  };

  const onClose = () => {
    setSelectedCord(null);
    setWaterData(null);
    setImageUrl(null);
  };

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    if (selectedCord) {
      return onClose();
    }
    setSelectedCord(event.lngLat);
  };

  return (
    <div className="relative w-full h-full">
      <ReactMap
        ref={mapRef}
        {...viewState}
        reuseMaps
        style={{ height: "100%", width: "100%" }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onClick={onClick}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {selectedCord && (
          <Marker
            longitude={selectedCord.lng}
            latitude={selectedCord.lat}
            anchor="bottom"
          >
            <Pin size={20} />
          </Marker>
        )}
      </ReactMap>
      <SlideOver
        coord={selectedCord}
        onClose={onClose}
        waterData={waterData}
        setWaterData={setWaterData}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
      <ControlPanel onSelectBounty={onSelectBounty} />
    </div>
  );
}
