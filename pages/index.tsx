import { NextPageContext } from "next";
import Head from "next/head";
import { CMS } from "../service/cms/cms";
import { Post } from "../service/cms/domain";
import { PostLink } from "../components/PostLink";
import { List, ListItem } from "@mui/material";

interface Props {
  readonly posts: Array<Post>;
}

export default function Home(props: Props): JSX.Element {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Home | NextJS Workshop</title>
      </Head>
      <h1>NextJS Workshop</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
        excepturi voluptatem architecto, eos laboriosam exercitationem
        consectetur cupiditate tempora fugiat maiores dolorum quo, ipsum nemo
        corporis qui sapiente perferendis? Rem, nostrum.
      </p>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, esse
        aliquid iure consectetur, repudiandae laudantium corrupti nisi
        reprehenderit accusantium architecto commodi. Modi architecto officia
        nulla quisquam velit sed doloremque unde?
      </p>

      <List>
        {posts.map((post) => (
          <ListItem key={`blog-post-link-${post.id}`}>
            <PostLink title={post.title} slug={`/post/${post.id}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export async function getStaticProps(context: NextPageContext) {
  const cms = new CMS();
  const posts = await cms.getPosts({ featured: true });

  return {
    props: { posts },
  };
}
