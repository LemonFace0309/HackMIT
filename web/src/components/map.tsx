import { useState } from "react";
import ReactMap, {
  GeolocateControl,
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import { SlideOver } from "@/components/slide-over";
import { Pin } from "@/components/pin";
import { Coordinate } from "@/types";

export function Map() {
  const [selectedCord, setSelectedCord] = useState<Coordinate | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 42.3601,
    longitude: -71.0942,
    zoom: 14,
  });

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    console.log("Point selected:", event);
    if (selectedCord) {
      setSelectedCord(null);
      return;
    }
    setSelectedCord(event.lngLat);
  };

  return (
    <div className="relative w-full h-full">
      <ReactMap
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
      <SlideOver coord={selectedCord} onClose={() => setSelectedCord(null)} />
    </div>
  );
}
