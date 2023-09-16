import { useCallback, useState } from "react";
import ReactMap, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import { ControlPanel } from "@/components/control-panel";
import { DrawControl } from "@/components/draw-controls";

import { Pin } from "@/components/pin";

export function Map() {
  const [viewState, setViewState] = useState({
    latitude: 42.3601,
    longitude: -71.0942,
    zoom: 14,
  });

  const [features, setFeatures] = useState<Record<string, string>>({});
  const [curCordinates, setCurCordinates] = useState<number[]>([]);
  console.log(curCordinates);

  const onUpdate = useCallback((e: { features: any[] }) => {
    setCurCordinates(e.features[0].geometry.coordinates);
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: { features: any[] }) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      <ReactMap
        // {...viewState}
        reuseMaps
        style={{ height: "100%", width: "100%" }}
        // onMove={(evt) => setViewState(evt.viewState)}
        initialViewState={{
          latitude: 42.3601,
          longitude: -71.0942,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <ControlPanel polygons={Object.values(features)} />
      </ReactMap>
    </div>
  );
}
