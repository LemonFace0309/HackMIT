import type { NextApiRequest, NextApiResponse } from "next";

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

  // TODO(William)
  // MAKE SURE THE DATA IS FORMATTED PROPERLY (TYPES ARE CORRECT) OR THINGS WILL BREAK

  const data = {};

  res.status(200).json({ data });
}
