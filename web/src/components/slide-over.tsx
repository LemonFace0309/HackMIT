import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import Image from "next/image";

import { CloseIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { Recommendations } from "@/components/recommendations";
import { Coordinate, WaterData } from "@/types";
import { exportToPdf } from "@/utils/export-to-pdf";
import { formatCoordinate } from "@/utils/format-coordinate";

interface BackgroundImageElements extends HTMLFormControlsCollection {
  url: HTMLInputElement;
}

interface BackgroundImageForm extends HTMLFormElement {
  readonly elements: BackgroundImageElements;
}

type SlideOverProps = {
  coord: Coordinate | null;
  onClose: () => void;
  waterData: WaterData | null;
  setWaterData: Dispatch<SetStateAction<WaterData | null>>;
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
};

export function SlideOver({
  coord,
  onClose,
  waterData,
  setWaterData,
  imageUrl,
  setImageUrl,
}: SlideOverProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
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

      setImageUrl(URL.createObjectURL(selectedFile));

      const response = await axios.post("/api/analyze-water", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setWaterData(response.data.data);

      if (!response.data.data) {
        alert(
          "We currently don't fully support image upload! 😭 Please submit an imageURL for now."
        );
      }

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
    setImageUrl(url);

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
        <Box id="assessment" overflowY="auto" h="100%">
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
              className="space-y-2"
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
                  onClick={() =>
                    alert(
                      "Satellite imagery coming soon! 🥳 Please submit an imageURL for now."
                    )
                  }
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

              {imageUrl && (
                <div className="relative w-full h-[200px] lg:h-[300px] mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Water"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {isLoading && (
                <Text>Analyzing image, please wait up to 30 seconds...</Text>
              )}
              {/* Todo: Replace null with loading state */}
              {waterData && !isLoading && (
                <>
                  <Recommendations waterData={waterData} />
                  {coord.bounty && (
                    <>
                      <Heading size="lg" mt={5}>
                        Bounty
                      </Heading>
                      <Text className="mt-3">
                        You will receive <b>${coord.bounty.toFixed(2)}</b> as a
                        reward!
                      </Text>
                    </>
                  )}
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    className="w-full"
                    leftIcon={<Icon as={DownloadIcon} />}
                    onClick={() => {
                      exportToPdf(
                        `Water Report [${formatCoordinate(
                          coord.lng,
                          "N",
                          "S"
                        )}, ${formatCoordinate(coord.lat, "E", "W")}]`
                      );
                      onClose();
                    }}
                  >
                    Export Report
                  </Button>
                </>
              )}
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
