// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { Authentication } from "../../../service/auth/authentication";
import { isDefined } from "../../../utils/isDefined";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const payload = JSON.parse(req.body);

  if (req.method === "POST") {
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
          serialize("authorization", "null", { path: "/" })
        );
        return res.status(400).send(undefined);
      }
    }
  } else {
    return res.status(405).json({
      message: `Method of type '${req.method}' is not yet supported`,
    });
  }
}
