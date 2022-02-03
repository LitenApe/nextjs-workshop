import Head from "next/head";
import { CMS } from "../../service/cms/cms";
import { Post } from "../../service/cms/domain";
import { isDefined } from "../../utils/isDefined";

import * as React from "react";
import { useFetch } from "../../hooks/useFetch";
interface Props {
  readonly id: string;
}

export default function BlogPost(props: Props): JSX.Element {
  const { id } = props;
  const { result, isFetching, callback } = useFetch<Post>(`/api/post/${id}`);

  React.useEffect(() => {
    callback();
  }, []);

  if (isFetching) {
    return <p>...loading</p>;
  }

  if (result === undefined) {
    return <p>error</p>;
  }

  const { title, published_at, content } = result;

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
  return {
    props: { id: context.params.slug },
    revalidate: 60,
  };
}
