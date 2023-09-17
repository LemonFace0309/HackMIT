import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }
  const { url } = req.body;

  if (!url) {
    return res.status(400).json("Image Required");
  }

  let prompt = `
  The following image is a image of a body of water taken by a smartphone. 
  Analyze the following water body's water quality. 
  To the best of your ability using the image, describe the water body's algae concentration, the water color, whether there appears to be pollutants, and other relevant features of the water body. 
  
  Give the water a score out of 10 based on how clear it is with an explanation. 
  Image Link: ${url}

  If you cannot read the image, provide your best guess without mentioning.
  
  Format the output in json with the following water quality metrics of: 
  1. Score out of 10 (Provide only a number): 
  2. Explanation for score:, 
  3. Water Clarity, 
  4. Bioindicators, 
  5. Water Color, 
  6. Presence of Algae, 
  7. Array of 3 Implictions of water quality (on wildlife, on human population, other stakeholders), 
  8. Array of 3 Recommendations to improve water quality.

  Do not include anything else other than the JSON format in the output.

  This is an example output:
  "{
    "Score out of 10": 3,
    "Explanation for score": "The water shows signs of significant algae growth and discoloration, indicating potential pollutants or run-off which are lowering its clarity and overall quality. Possible algal blooms could be harmful for aquatic life as well as humans.",
    "Water Clarity": "Low - Heavy discoloration implies poor visibility through the water",
    "Bioindicators": "Presence of significant algae growth indicates possible nutrient pollution",
    "Water Color": "Greenish-Brown indicating significant algae presence and possible pollutants",
    "Presence of Algae": "Yes - There is a significant amount of algae, potentially indicating an algal bloom",
    "Implications of water quality": [
        "Potential harm to aquatic life due to decreased oxygen levels from algal growth",
        "Algal toxin presence could potentially harm human population if the water is used for drinking or recreational activities",
        "The water source could be a cause of concern for environmental agencies or stakeholders interested in maintaining local ecosystem health"
    ],
    "Recommendations to improve water quality": [
        "Investigate the source of nutrient pollution leading to significant algae growth and consider mitigation strategies",
        "Regular monitoring of water quality to keep track of changes and implement measures accordingly",
        "Public education on the importance of proper waste disposal and reduction of nutrient run-off into local water bodies"
    ]
    }"
  `
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        "role": "user",
        "content": prompt,
      },
    ],
    temperature: 1,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // console.log(response);
  console.log(response.choices[0].message.content);

  let content = response.choices[0].message.content || "";

  let jsonContent = content.substring(content.indexOf("{"), content.indexOf("}") + 1)
  jsonContent.replaceAll("\\","");

  // console.log(jsonContent)

  const data = JSON.parse(jsonContent);

  // console.log({ data })

  res.status(200).json({ data });
}
