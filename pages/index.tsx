import { NextPageContext } from "next";
import Head from "next/head";

export default function Home(): JSX.Element {
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
    </>
  );
}

export async function getStaticProps(context: NextPageContext) {
  return {
    props: {},
  };
}
