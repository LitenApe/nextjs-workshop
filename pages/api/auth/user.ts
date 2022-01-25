// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Authentication } from "../../../service/auth/authentication";
import { isDefined } from "../../../utils/isDefined";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const payload = JSON.parse(req.body);

  if (req.method === "POST") {
    if (!isDefined(payload.identity) || !isDefined(payload.secret)) {
      return res.status(400).json({
        message:
          "Partial payload received. Both 'identity' and 'secret' is required",
      });
    } else {
      const auth = new Authentication();

      auth
        .signIn(payload)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(400).json({ message: err });
        });
    }
  } else {
    return res.status(405).json({
      message: `Method of type '${req.method}' is not yet supported`,
    });
  }
}
