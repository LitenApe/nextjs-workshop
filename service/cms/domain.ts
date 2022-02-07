export interface PostV3 {
  id: number;
  title: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PostV4 {
  id: number;
  attributes: {
    title: string;
    content: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Options {
  featured?: true;
  drafts?: true;
  preview?: true;
}

export interface DataSource {
  getPost(id: String, options?: Options): Promise<Post>;
  getPosts(options: Options): Promise<Array<Post>>;
}
