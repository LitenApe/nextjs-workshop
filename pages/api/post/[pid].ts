import { NextApiRequest, NextApiResponse } from "next";
import { CMS } from "../../../service/cms/cms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "GET") {
    return res.status(405).send(undefined);
  }

  if (
    typeof req.cookies.authorization === undefined ||
    req.cookies.authorization === "null"
  ) {
    return res.status(401).send(undefined);
  }

  const cms = new CMS();
  const { pid } = req.query;

  if (Number.isNaN(parseInt(pid as string))) {
    return res.status(400).json({
      message: "id must be of type number",
    });
  }

  try {
    const post = await cms.getPost(pid as string);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).send(undefined);
  }
}
