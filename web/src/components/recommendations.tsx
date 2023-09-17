import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

import type { WaterData } from "@/types";

type RecommendationsProps = {
  waterData: WaterData;
};

export const Recommendations = ({ waterData }: RecommendationsProps) => {
	// Determine the background color based on the score
	let bgColor;
	if (waterData['Score out of 10'] <= 3) {
		bgColor = 'red.500';
	} else if (waterData['Score out of 10'] <= 6) {
		bgColor = 'yellow.500';
	} else {
		bgColor = 'green.500';
	}
	return (
		<Box>
			<Box
				mt={6} // Add margin-top for spacing above
				p={4}
				bg={bgColor}
				borderRadius="full"
				display="flex"
				alignItems="center"
				justifyContent="center"
				mb={4}
				boxShadow="md"
			>
				<Heading size="md" color="white">
					Score: {waterData['Score out of 10']}/10
				</Heading>
			</Box>
			<Text mt={3}>{waterData['Explanation for score']}</Text>

			<Heading size="lg" mt={5}>
				Water Details
			</Heading>
			<Text mt={3}>
				<b>Water Clarity:</b> {waterData['Water Clarity']}
			</Text>
			<Text mt={3}>
				<b>Bioindicators:</b> {waterData['Bioindicators']}
			</Text>
			<Text mt={3}>
				<b>Water Color:</b> {waterData['Water Color']}
			</Text>
			<Text mt={3}>
				<b>Presence of Algae:</b> {waterData['Presence of Algae']}
			</Text>

			<Heading size="lg" mt={5}>
				Implications
			</Heading>
      <List mt={3}>
				{waterData['Implications of water quality'].map(
					(recommendation, index) => (
						<ListItem key={index}>{recommendation}</ListItem>
					)
				)}
			</List>

			<Heading size="lg" mt={5}>
				Recommendations to Improve
			</Heading>
			<List mt={3}>
				{waterData['Recommendations to improve water quality'].map(
					(recommendation, index) => (
						<ListItem key={index}>{recommendation}</ListItem>
					)
				)}
			</List>
		</Box>
	);
};
