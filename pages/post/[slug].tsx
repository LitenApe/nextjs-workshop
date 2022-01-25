import Head from "next/head";
import { CMS } from "../../service/cms/cms";
import { PublishedPost } from "../../service/cms/domain";

interface Props {
  readonly post: PublishedPost;
}

export default function Post(props: Props): JSX.Element {
  const { post } = props;

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <p>Published {post.published_at}</p>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "1" } }, { params: { slug: "2" } }],
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const cms = new CMS();
  const post = await cms.getPost(context.params.slug);

  return {
    props: { post },
  };
}
