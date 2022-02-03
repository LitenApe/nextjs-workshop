import { Logger } from "../logger/logger";
import { UserCredentials } from "./domain";

export class Authentication {
  private logger;
  private baseUrl = process.env.STRAPI_URL;

  constructor() {
    this.logger = new Logger("Authentication");
  }

  private async internalFetch<T = unknown>(
    uri: RequestInfo,
    options: RequestInit
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${uri}`, options);

    if (!res.ok) {
      this.logger.error(
        `Failed to interact with resource at [uri=${uri}]. Service responded with [status=${res.status}]`
      );
      throw new Error("Failed request: " + res.statusText);
    }

    return res.json();
  }

  async signIn(
    credentials: UserCredentials
  ): Promise<{ jwt: string; user: unknown }> {
    this.logger.info(
      `verifying credentials for [identity=${credentials.identity}]`
    );

    const res = await this.internalFetch<{ jwt: string; user: unknown }>(
      "/api/auth/local",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          identifier: credentials.identity,
          password: credentials.secret,
        }),
      }
    );

    return res;
  }
}
