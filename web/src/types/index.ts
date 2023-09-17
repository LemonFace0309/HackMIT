export type Direction = "N" | "S" | "E" | "W";

export type Coordinate = {
  lat: number;
  lng: number;
};

export type WaterData = {
  Name: string;
  "Score out of 10": number;
  "Explanation for score": string;
  "Water Clarity": string;
  Bioindicators: string;
  "Water Color": string;
  "Presence of Algae": string;
  "Implications of water quality": string[];
  "Recommendations to improve water quality": string[];
};
