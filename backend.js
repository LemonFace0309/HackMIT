// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      "role": "user",
      "content": "The following image is a phone image of a body of water. Analyze the following water body's water quality. To the best of your ability using the image, describe the water body's algae concentration, the water color, whether there appears to be pollutants, and other relevant features of the water body. Give the water a score out of 10 based on how clear it is with an explanation:  https://media.istockphoto.com/id/1280015859/photo/blue-lake-with-treeline-in-autumn-color-on-a-sunny-afternoon-in-northern-minnesota.jpg?s=612x612&w=0&k=20&c=smtj8bw1BW3gUI9rrxRnAzQKGWmTyMQYcODgbuWNMbc="
    },
  ],
  temperature: 1,
  max_tokens: 512,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});