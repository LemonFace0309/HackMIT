export type Direction = "N" | "S" | "E" | "W";

export type Coordinate = {
  lat: number;
  lng: number;
};

export type WaterData = {
  name: string;
  "Score out of 10": number;
  "Water Clarity": string;
  Bioindicators: string;
  "Water Color": string;
  "Presence of Algae": string;
  "On Wildlife": string;
  "On Human Population": string;
  "Other Stakeholders": string;
  "3 Recommendations to improve water quality": string[];
};
