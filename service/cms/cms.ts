import { isDefined } from "../../utils/isDefined";
import { Logger } from "../logger/logger";
import { Post } from "./domain";

interface Options {
  featured?: true;
  drafts?: true;
  preview?: true;
}

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

  async getPost(id: string): Promise<Post> {
    this.logger.trace(`Retrieving post with [id=${id}]`);

    const res = await this.internalFetch<Post>(
      `blog-posts/${id}?_publicationState=preview`
    );

    this.logger.trace(`Successfully retrieved post with [id=${id}]`);

    return res;
  }

  async getPosts(options: Options = {}): Promise<Array<Post>> {
    const { featured, drafts, preview } = options;
    this.logger.trace(
      "Retrieving posts",
      `provided options: [featured=${featured}], [drafts=${drafts}], [preview=${preview}]`
    );

    const query = new URLSearchParams();

    if (isDefined(featured)) {
      query.append("_isFeatured", "true");
    }

    if (isDefined(drafts)) {
      query.append("published_at_null", "true");
    }

    if (isDefined(drafts) || isDefined(preview)) {
      query.append("_publicationState", "preview");
    }

    const res = await this.internalFetch<Array<Post>>(
      `blog-posts?${query.toString()}`
    );

    this.logger.trace(`Successfully retrieved [length=${res.length}] posts`);
    return res;
  }
}
