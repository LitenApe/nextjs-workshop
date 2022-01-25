export interface PublishedPost {
  id: number;
  title: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface DraftPost {
  id: number;
  title: string;
  content: string;
  published_at: null;
  created_at: string;
  updated_at: string;
}

export type Post = PublishedPost | DraftPost;
