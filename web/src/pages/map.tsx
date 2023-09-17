import * as React from "react";
import Head from "next/head";

import { Map } from "@/components/map";
// import { Map } from "@/components/map-playground";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapPage() {
  return (
    <div>
      <Head>
        <title>AquaGuard Map</title>
      </Head>

      <div className="w-screen h-screen">
        <Map />
      </div>
    </div>
  );
}
