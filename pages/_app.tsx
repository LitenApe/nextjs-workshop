import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Main } from "../components/layout/Main";
import { RouteTransition } from "../components/RouteTransition/RouteTransition";
import { NavigationBar } from "../components/layout/NavigationBar";
import { Footer } from "../components/layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouteTransition>
      <NavigationBar />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </RouteTransition>
  );
}

export default MyApp;
