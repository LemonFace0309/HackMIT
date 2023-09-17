import * as React from "react";
import Head from "next/head";
import Link from "next/link";

import { Button, ButtonGroup } from "@chakra-ui/react";

import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>TODO: Add better title</title>
      </Head>

      <div className="relative w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="w-full h-full flex justify-center items-center flex-col z-10 text-white space-y-8">
          <h1 className="text-8xl font-bold">AquaGuard</h1>
          <h2 className="text-4xl text-center">
            We empower all individuals with the data and tangible insights to
            safeguard their local water sources regardless of their location
            from the palm of their hands.
          </h2>
          <ButtonGroup
            colorScheme="orange"
            size="2xl"
            className="w-full lg:w-2/5 flex flex-col lg:flex-row mt-4 space-y-4 lg:space-y-0 space-x-0 lg:space-x-4"
          >
            <Link href="/map" className="flex-1">
              <Button variant="solid" className="w-full p-4">
                Get Started
              </Button>
            </Link>
            <Link
              href="https://github.com/WilliamUW/HackMIT"
              target="_blank"
              className="flex-1"
            >
              <Button variant="outline" className="w-full p-4">
                View Source Code
              </Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
