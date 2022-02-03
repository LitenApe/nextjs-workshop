import { DataSource, Options, Post } from "./domain";
import { StrapiV4 } from "./sources/strapiv4";

export class CMS {
  private source: DataSource;

  constructor() {
    this.source = new StrapiV4();
  }

  async getPost(id: string): Promise<Post> {
    const res = await this.source.getPost(id);
    return res;
  }

  async getPosts(options: Options = {}): Promise<Array<Post>> {
    const res = await this.source.getPosts(options);
    return res;
  }
}
