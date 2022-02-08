import { List, ListItem } from "@mui/material";
import { NextPageContext } from "next";
import Head from "next/head";
import { PostLink } from "../../components/PostLink";
import { CMS } from "../../service/cms/cms";
import { Post } from "../../service/cms/domain";

interface Props {
  readonly posts: Array<Post>;
}

export default function Overview(props: Props): JSX.Element {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Blog post overview | NextJS Workshop</title>
      </Head>
      <h1>Blog posts</h1>

      <List>
        {posts.map((post) => (
          <ListItem key={`blog-post-link-${post.id}`}>
            <PostLink title={post.title} slug={`/draft/${post.id}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const cms = new CMS();
    const posts = await cms.getPosts({ drafts: true });

    return {
      props: { posts },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }
}
