// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { Authentication } from "../../../service/auth/authentication";
import { isDefined } from "../../../lib/isDefined";

async function postHandler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  const payload = JSON.parse(req.body);
  if (!isDefined(payload.identity) || !isDefined(payload.secret)) {
    return res.status(400).json({
      message:
        "Partial payload received. Both 'identity' and 'password' is required",
    });
  } else {
    const auth = new Authentication();

    try {
      const response = await auth.signIn(payload);
      res.setHeader(
        "Set-Cookie",
        serialize("authorization", response.jwt, { path: "/" })
      );
      return res.status(200).json(response);
    } catch (err) {
      res.setHeader(
        "Set-Cookie",
        serialize("authorization", "", { path: "/", expires: new Date() })
      );
      return res.status(400).send(undefined);
    }
  }
}

function deleteHandler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  res.setHeader(
    "Set-Cookie",
    serialize("authorization", "", { path: "/", expires: new Date() })
  );
  return res.status(200).send(undefined);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  if (req.method === "POST") {
    postHandler(req, res);
  } else if (req.method === "DELETE") {
    deleteHandler(req, res);
  } else {
    return res.status(405).json({
      message: `Method of type '${req.method}' is not yet supported`,
    });
  }
}
