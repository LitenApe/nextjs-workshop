import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Logger } from "../../service/logger/logger";
import { isDefined } from "../../utils/isDefined";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = req.cookies["authorization"];

  if (!isDefined(token)) {
    const logger = new Logger("Middleware(draft)");
    logger.info(`User from [ip=${req.ip}] attempted to access resource`);
    return NextResponse.redirect("/auth/signin", 307);
  }

  return NextResponse.next();
}
