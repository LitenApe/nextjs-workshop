import { ServerResponse } from "http";
import { isDefined } from "../../utils/isDefined";

const guarded = ["/draft"];

export async function authGuard(
  req?: any,
  res?: ServerResponse
): Promise<boolean> {
  if (!isDefined(req) || !isDefined(res)) {
    return true;
  }

  const url = req.url;
  const token = req.cookies["authorization"];
  const isGuardedRoute = guarded.reduce(
    (acc, path) => acc || url.startsWith(path),
    false
  );

  // if (isGuardedRoute && !isDefined(token)) {
  //   res.writeHead(302, {
  //     Location: "/auth/signin",
  //   });
  //   res.end();
  // }
  return isGuardedRoute && !isDefined(token);
}
