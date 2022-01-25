import { Logger } from "../logger/logger";
import { DraftPost, PublishedPost } from "./domain";

export class CMS {
  private logger;
  private baseUrl = process.env.STRAPI_URL;

  constructor() {
    this.logger = new Logger("CMS");
  }

  private async internalFetch<T = unknown>(uri: string): Promise<T> {
    const resource = `${this.baseUrl}/${uri}`;
    const res = await fetch(resource);

    if (!res.ok) {
      this.logger.error(
        `Failed to retrieve resources at [url=${resource}]. Responded with [status=${res.status}]`
      );
      throw new Error("Failed request: " + res.statusText);
    }

    return res.json();
  }

  async getPost(id: string): Promise<PublishedPost> {
    this.logger.trace(`Retrieving post with [id=${id}]`);

    const res = await this.internalFetch<PublishedPost>(`blog-posts/${id}`);

    console.log("response", res);

    this.logger.trace(`Successfully retrieved post with [id=${id}]`);

    return res;
  }

  async getPosts(featured: boolean = false): Promise<Array<PublishedPost>> {
    this.logger.trace("Retrieving posts");

    const res = await this.internalFetch<Array<PublishedPost>>(
      `blog-posts${featured ? "?_isFeatured=true" : ""}`
    );

    this.logger.trace(`Successfully retrieved [length=${res.length}] posts`);
    return res;
  }

  async getDrafts(): Promise<Array<DraftPost>> {
    this.logger.trace("Retrieving drafts");

    const res = await this.internalFetch<Array<DraftPost>>(
      "blog-posts?published_at_null=true&_publicationState=preview"
    );

    this.logger.trace(`Successfully retrieved [length=${res.length}] drafts`);
    return res;
  }
}
