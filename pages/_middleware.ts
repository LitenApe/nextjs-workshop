import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Logger } from "../service/logger/logger";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const logger = new Logger("Middleware(root)");
  logger.info(`User retrieved resource [url=${req.url}]`);
  return NextResponse.next();
}
