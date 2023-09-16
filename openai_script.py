import os
import openai
from dotenv import load_dotenv
from rich.console import Console
from rich.markdown import Markdown
import sys

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

imageUrl = input("Enter image url: ")
print(f"Image URL: {imageUrl}")

prompt = f"""
The following image is a image of a body of water taken by a smartphone. 
Analyze the following water body's water quality. 
To the best of your ability using the image, describe the water body's algae concentration, the water color, whether there appears to be pollutants, and other relevant features of the water body. 

Give the water a score out of 10 based on how clear it is with an explanation. 
Image Link: {imageUrl}. 

Format the output in bullet points with the water quality metrics of: 
1. Score out of 10 (Provide only a number): 
2. Explanation for score:, 
3. Water Clarity, 
4. Bioindicators, 
5. Water Color, 
6. Presence of Algae, 
7. Implictions of water quality, 
8. Recommendations to improve water quality.
"""

response = openai.ChatCompletion.create(
  model="gpt-4",
  messages=[
    {
      "role": "user",
      "content": prompt
    },
  ],
  temperature=1,
  max_tokens=400,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

print(response)

content = response["choices"][0]["message"]["content"]

console = Console()
console.print(Markdown(content))
   
