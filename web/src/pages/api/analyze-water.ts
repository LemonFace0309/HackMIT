import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import { WaterData } from "@/types";
import { sleep } from "@/utils/sleep";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const form = formidable({});
  let fields;
  let files;
  let image: formidable.File | undefined;
  try {
    [fields, files] = await form.parse(req);
    image = files.image?.[0];
  } catch (err) {
    console.error(err);
    return res.status(400).json("Unexpected Error");
  }

  if (!image) {
    return res.status(400).json("Image Required");
  }

  // console.log(image.filepath)

  const allWaterData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src", "data", "water.json"),
      "utf-8"
    )
  );

  let data = allWaterData.find(
    (item: WaterData) => item.Name === image!.originalFilename
  );

  if (!data) {
    // TODO(William): Add node script here to process and return results
    // console.log(fields.imageUrl)
    data = null; // todo
  }

  await sleep(10000);

  res.status(200).json({ data });
}
