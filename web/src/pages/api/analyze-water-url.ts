import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }
  const { image } = req.body;

  if (!image) {
    return res.status(400).json("Image Required");
  }

  // TODO(William)

  const data = {};

  res.status(200).json({ data });
}
