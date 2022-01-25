import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Main } from "../components/layout/Main";
import { RouteTransition } from "../components/RouteTransition/RouteTransition";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouteTransition>
      <Main>
        <Component {...pageProps} />
      </Main>
    </RouteTransition>
  );
}

export default MyApp;
