import { AddIcon, CloseIcon, LinkIcon, MinusIcon } from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  ListItem,
  Text,
  UnorderedList,
  chakra,
  useToken,
} from "@chakra-ui/react";
import { cloneElement, useRef, useState } from "react";

import { Coordinate, WaterData } from "@/types";
import { Recommendations } from "./recommendations";
import axios from "axios";
import { formatCoordinate } from "@/utils/format-coordinate";
import waterData from "../data/water.json";

type SlideOverProps = {
  coord: Coordinate | null;
  onClose: () => void;
};

export function SlideOver({ coord, onClose }: SlideOverProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const variant = coord ? "open" : "closed";
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const recommendations: string[] = [];

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post("/api/analyze-water", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
              <Heading as="h1">Title</Heading>

              <Text>
                📍 Centered at{" "}
                <b>
                  {formatCoordinate(coord.lng, "N", "S")},&nbsp;
                  {formatCoordinate(coord.lat, "E", "W")}
                </b>
              </Text>
              {/* <Text>
                📆 Data from <b>{curHotspot.minTime}</b> to{" "}
                <b>{curHotspot.maxTime}</b>
              </Text> */}

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
              <Heading as="h2" fontSize="3xl" mt={4}>
                Recommendations
              </Heading>
              <Recommendations waterData={waterData[0] as WaterData} />
              <UnorderedList>
                {recommendations.map((rec, i) => {
                  return (
                    <ListItem mt={4} key={i}>
                      {rec}
                    </ListItem>
                  );
                })}
              </UnorderedList>
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
