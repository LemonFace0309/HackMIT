import * as React from "react";
import Head from "next/head";
import Image from "next/image";

import { Heading } from "@chakra-ui/react";

import { Map } from "@/components/map";
import Background from "../../public/background.jpeg";

import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>TODO: Add better title</title>
      </Head>

      <div className="relative w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="w-full h-full grid place-items-center z-10 text-white">
          <Heading as="h1" size="4xl" noOfLines={1}>
            AquaGuard
          </Heading>
        </div>
      </div>
    </div>
  );
}
