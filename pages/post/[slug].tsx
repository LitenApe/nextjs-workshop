import Head from "next/head";
import { CMS } from "../../service/cms/cms";
import { Post } from "../../service/cms/domain";
import { isDefined } from "../../utils/isDefined";

interface Props {
  readonly post: Post;
}

export default function BlogPost(props: Props): JSX.Element {
  const {
    post: { title, published_at, content },
  } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {isDefined(published_at) && <p>Published {published_at}</p>}
      <h1>{title}</h1>
      <p>{content}</p>
    </>
  );
}

export async function getStaticPaths() {
  const cms = new CMS();
  const posts = await cms.getPosts({ preview: true });

  return {
    paths: posts.map((post) => ({
      params: {
        slug: String(post.id),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const cms = new CMS();
  const post = await cms.getPost(context.params.slug);

  return {
    props: { post },
    revalidate: 60,
  };
}
