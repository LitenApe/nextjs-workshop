import { isDefined } from "../../../utils/isDefined";
import { Logger } from "../../logger/logger";
import { DataSource, Options, Post, PostV4 } from "../domain";

export class StrapiV4 implements DataSource {
  private logger;
  private baseUrl = process.env.STRAPI_URL;

  constructor() {
    this.logger = new Logger("CMS(Strapi.v4)");
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

  async getPost(id: string): Promise<Post> {
    this.logger.info(`Retrieving post with [id=${id}]`);

    const res = await this.internalFetch<{ data: PostV4 }>(
      `/api/blog-posts/${id}?publicationState=preview`
    );

    this.logger.info(`Successfully retrieved post with [id=${id}]`);
    return {
      id: res.data.id,
      title: res.data.attributes.title,
      created_at: res.data.attributes.createdAt,
      published_at: res.data.attributes.publishedAt,
      updated_at: res.data.attributes.updatedAt,
      content: res.data.attributes.content,
    };
  }

  async getPosts(options: Options = {}): Promise<Array<Post>> {
    const { featured, drafts, preview } = options;
    this.logger.info(
      "Retrieving posts",
      `provided options: [featured=${featured}], [drafts=${drafts}], [preview=${preview}]`
    );

    const query = new URLSearchParams();

    if (isDefined(featured)) {
      query.append("filter[featured][$eq]", "true");
    }

    const res = await this.internalFetch<{ data: Array<PostV4> }>(
      `/api/blog-posts?${query.toString()}`
    );

    this.logger.info(
      `Successfully retrieved [length=${res.data.length}] posts`
    );
    return res.data.map((post) => ({
      id: post.id,
      title: post.attributes.title,
      content: post.attributes.content,
      created_at: post.attributes.createdAt,
      published_at: post.attributes.publishedAt,
      updated_at: post.attributes.updatedAt,
    }));
  }
}
