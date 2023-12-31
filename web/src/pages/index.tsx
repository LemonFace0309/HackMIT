import "mapbox-gl/dist/mapbox-gl.css";

import * as React from "react";

import { Button, ButtonGroup } from "@chakra-ui/react";

import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>AquaGuard Homepage</title>
      </Head>

      <div className="relative w-screen h-screen bg-gradient-to-r from-cyan-900 to-cyan-700 p-8">
        <div className="w-full h-full flex justify-center items-center flex-col z-10 text-white space-y-8">
          <h1 className="text-3xl lg:text-8xl font-bold">AquaGuard</h1>
          <h2 className="text-xl lg:text-4xl text-center">
            We empower all individuals with the data and tangible insights to
            safeguard their local water sources regardless of their location
            from the palm of their hands.
          </h2>
          <ButtonGroup
            colorScheme="orange"
            size="2xl"
            className="w-full md:w-4/5 lg:w-2/5 flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 space-x-0 md:space-x-4"
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
