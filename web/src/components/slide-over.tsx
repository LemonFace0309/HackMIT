import { AddIcon, CloseIcon, LinkIcon, MinusIcon } from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";

import { Coordinate, WaterData } from "@/types";
import { Recommendations } from "./recommendations";
import axios from "axios";
import { formatCoordinate } from "@/utils/format-coordinate";
import Image from 'next/image'

interface BackgroundImageElements extends HTMLFormControlsCollection {
  url: HTMLInputElement;
}

interface BackgroundImageForm extends HTMLFormElement {
  readonly elements: BackgroundImageElements;
}

type SlideOverProps = {
  coord: Coordinate | null;
  onClose: () => void;
};

export function SlideOver({ coord, onClose }: SlideOverProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [waterData, setWaterData] = useState<WaterData | null>(null);
  const [imageUrl, setImageUrl] = useState<String | null>(null);
  const variant = coord ? "open" : "closed";
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      console.log(selectedFile.name)

      switch (selectedFile.name) {
        case "clear.jpg":
          setImageUrl("https://media.istockphoto.com/id/1280015859/photo/blue-lake-with-treeline-in-autumn-color-on-a-sunny-afternoon-in-northern-minnesota.jpg?s=612x612&w=0&k=20&c=smtj8bw1BW3gUI9rrxRnAzQKGWmTyMQYcODgbuWNMbc=");
          break;
        case "algae.jpg":
          setImageUrl("https://i.ibb.co/3Mwwp79/wss-qw-algal-bloom-lake.jpg");
          break;
        case "fish.jpg":
          setImageUrl("https://img.freepik.com/premium-photo/red-white-fish-swim-pond_666696-646.jpg?w=1380");
          break;
        case "muddy.jpg":
          setImageUrl("https://www.agriculture.com/thmb/v1YUxaWEoLu103WV2-F_OkfUjWQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/muddypondtx-1-9f8e2d04a7a54d46b2a042320cdcfdd8.jpg");
          break;
        case "lakelouise.jpg":
          setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lake_Louise_in_Banff_National_Park%2C_boat_view_2.jpg/1200px-Lake_Louise_in_Banff_National_Park%2C_boat_view_2.jpg");
          break;
        default:
          setImageUrl(null);
          break;
      }

      const response = await axios.post("/api/analyze-water", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setWaterData(response.data.data);

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setIsLoading(false);
  };

  const updateImageUrl = async (e: FormEvent<BackgroundImageForm>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    const url = e.currentTarget.elements.url.value;
    setImageUrl(url)
    try {
      const response = await axios.post("/api/analyze-water-url", {
        url,
      });

      setWaterData(response.data.data);

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        transition={{
          ease: "easeInOut",
        }}
        variants={variants}
        animate={variant}
        initial="closed"
        className="absolute top-0 bottom-0 left-0 w-full overflow-auto md:w-2/5 bg-white shadow-md z-10"
      >
        <Box overflowY="auto" h="100%">
          <IconButton
            position="absolute"
            top={10}
            right={8}
            variant="unstyled"
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={onClose}
          />
          {!!coord && (
            <Box
              p={10}
              fontSize="xl"
              textShadow="0px 0px 20px rgba(0,0,0,0.5)"
              id="printable"
              sx={{
                "> p": { mt: 4 },
              }}
            >
              <Heading as="h1">Water Details</Heading>

              <Text>
                📍 Centered at{" "}
                <b>
                  {formatCoordinate(coord.lng, "N", "S")},&nbsp;
                  {formatCoordinate(coord.lat, "E", "W")}
                </b>
              </Text>

              <ButtonGroup
                colorScheme="teal"
                size="lg"
                className="w-full flex flex-col lg:flex-row mt-4 space-y-4 lg:space-y-0 space-x-0 lg:space-x-4"
              >
                <Button
                  variant="outline"
                  isLoading={isLoading}
                  className="flex-1 p-4"
                >
                  Use Satellite Imagery
                </Button>
                <Button
                  variant="solid"
                  isLoading={isLoading}
                  className="flex-1 p-4"
                  onClick={() => fileUploadRef?.current?.click()}
                >
                  Upload a Photo
                </Button>
              </ButtonGroup>
              <form
                className="w-full space-x-4 flex mt-4"
                onSubmit={updateImageUrl}
              >
                <Input
                  name="url"
                  placeholder="Image URL"
                  colorScheme="teal"
                  size="lg"
                  required
                />
                <Button
                  colorScheme="teal"
                  size="lg"
                  type="submit"
                  variant="solid"
                  isLoading={isLoading}
                  className="p-4"
                >
                  Submit
                </Button>
              </form>
              {<Text></Text>}
              {imageUrl && <Image
                src={imageUrl}
                alt="Coin"
                width={500}
                height={450}
              />}
              {isLoading && <Text>Analyzing image, please wait up to 30 seconds...</Text>}
              {/* Todo: Replace null with loading state */}
              {waterData && !isLoading && <Recommendations waterData={waterData} />}
            </Box>
          )}
        </Box>
        {/* Manually invoke this */}
        <Input
          type="file"
          accept="image/*"
          display="none"
          ref={fileUploadRef}
          onChange={uploadImage}
        />
      </motion.div>
    </AnimatePresence>
  );
}
