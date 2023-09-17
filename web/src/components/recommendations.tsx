import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

type WaterData = {
	name: string;
	'Score out of 10': number;
	'Explanation for score': string;
	'Water Clarity': string;
	Bioindicators: string;
	'Water Color': string;
	'Presence of Algae': string;
	'Implictions of water quality': string;
	'Recommendations to improve water quality': string[];
};

type RecommendationsProps = {
	waterData: WaterData;
};

export const Recommendations = ({ waterData }: RecommendationsProps) => {
	return (
		<Box>
			<Heading size="md">Score: {waterData['Score out of 10']}/10</Heading>
			<Text mt={3}>{waterData['Explanation for score']}</Text>

			<Heading size="lg" mt={5}>
				Water Details
			</Heading>
			<Text mt={3}>
				<b>Clarity:</b> {waterData['Water Clarity']}
			</Text>
			<Text mt={3}>
				<b>Bioindicators:</b> {waterData['Bioindicators']}
			</Text>
			<Text mt={3}>
				<b>Color:</b> {waterData['Water Color']}
			</Text>
			<Text mt={3}>
				<b>Presence of Algae:</b> {waterData['Presence of Algae']}
			</Text>

			<Heading size="lg" mt={5}>
				Implications
			</Heading>
			<Text mt={3}>{waterData['Implictions of water quality']}</Text>

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
