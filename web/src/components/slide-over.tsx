import {
  Box,
  useToken,
  chakra,
  Flex,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Icon,
  Grid,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { AddIcon, CloseIcon, LinkIcon, MinusIcon } from "@chakra-ui/icons";

import { formatCoordinate } from "@/utils/format-coordinate";

type SlideOverProps = {
  coordinates: [number, number][];
  waterId: number;
  onClose: () => void;
};

export function SlideOver({ coordinates, waterId, onClose }: SlideOverProps) {
  const variant = waterId === -1 ? "closed" : "open";
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const recommendations: string[] = [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        transition={{
          ease: "easeInOut",
        }}
        variants={variants}
        animate={variant}
        initial="closed"
        className="absolute top-0 bottom-0 left-0 w-full overflow-auto md:w-2/5 bg-white shadow-md"
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
          {!!coordinates && (
            <Box
              p={10}
              fontSize="xl"
              textShadow="0px 0px 20px rgba(0,0,0,0.5)"
              id="printable"
              sx={{
                "> p": { mt: 4 },
              }}
            >
              <Heading as="h1">Location [Replace]</Heading>

              <Text>
                📍 Centered at{" "}
                <b>
                  {formatCoordinate(105.6, "N", "S")},&nbsp;
                  {formatCoordinate(505.2, "E", "W")}
                </b>
              </Text>
              {/* <Text>
                📆 Data from <b>{curHotspot.minTime}</b> to{" "}
                <b>{curHotspot.maxTime}</b>
              </Text> */}

              <Heading as="h2" fontSize="3xl" mt={4}>
                Recommendations
              </Heading>
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
      </motion.div>
    </AnimatePresence>
  );
}
