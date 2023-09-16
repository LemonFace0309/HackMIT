import { useState } from "react";
import ReactMap, { Source, Layer } from "react-map-gl";
import type { CircleLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-71.0942, 42.3601] },
      properties: { name: "MIT" },
    },
  ],
};

const layerStyle: CircleLayer = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

export function Map() {
  const [viewState, setViewState] = useState({
    latitude: 42.3601,
    longitude: -71.0942,
    zoom: 14,
  });

  return (
    <div className="relative w-full h-full">
      <ReactMap
        {...viewState}
        reuseMaps
        style={{ height: "100%", width: "100%" }}
        onMove={(evt) => setViewState(evt.viewState)}
        initialViewState={{
          latitude: 42.3601,
          longitude: -71.0942,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <Source id="main-map" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </ReactMap>
    </div>
  );
}
