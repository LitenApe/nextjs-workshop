import { isDefined } from "../../../utils/isDefined";
import { Logger } from "../../logger/logger";
import { DataSource, Options, Post, PostV3 } from "../domain";

export class StrapiV3 implements DataSource {
  private logger;
  private baseUrl = process.env.STRAPI_URL;

  constructor() {
    this.logger = new Logger("CMS(Strapi.v3)");
  }

  private async internalFetch<T = unknown>(uri: string): Promise<T> {
    const resource = `${this.baseUrl}${uri}`;
    const res = await fetch(resource);

    if (!res.ok) {
      this.logger.error(
        `Failed to retrieve resources at [url=${resource}]. Responded with [status=${res.status}]`
      );
      throw new Error("Failed request: " + res.statusText);
    }

    return res.json();
  }

  private generateSearchQuery(options: Options): string {
    if (Object.keys(options).length === 0) {
      return "";
    }

    const { featured, drafts, preview } = options;
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

    return `?${query.toString()}`;
  }

  async getPost(id: string, options: Options = {}): Promise<Post> {
    const { featured, drafts, preview } = options;
    this.logger.info(
      `Retrieving post with [id=${id}]`,
      `provided options: [featured=${featured}], [drafts=${drafts}], [preview=${preview}]`
    );

    const query = this.generateSearchQuery(options);
    const res = await this.internalFetch<PostV3>(`/blog-posts/${id}${query}`);

    this.logger.info(`Successfully retrieved post with [id=${id}]`);

    return res;
  }

  async getPosts(options: Options = {}): Promise<Array<Post>> {
    const { featured, drafts, preview } = options;
    this.logger.info(
      "Retrieving posts",
      `provided options: [featured=${featured}], [drafts=${drafts}], [preview=${preview}]`
    );

    const query = this.generateSearchQuery(options);
    const res = await this.internalFetch<Array<PostV3>>(`/blog-posts${query}`);

    this.logger.info(`Successfully retrieved [length=${res.length}] posts`);
    return res;
  }
}
