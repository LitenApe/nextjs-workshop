import Head from "next/head";
import { CMS } from "../../service/cms/cms";
import { Post } from "../../service/cms/domain";
import { isDefined } from "../../lib/isDefined";

import * as React from "react";

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

export async function getServerSideProps(context: any) {
  try {
    const cms = new CMS();
    const post = await cms.getPost(context.params.slug);

    return {
      props: { post },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}
