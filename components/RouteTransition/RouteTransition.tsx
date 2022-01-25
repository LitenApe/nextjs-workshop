import { Box } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { Logger } from "../../service/logger/logger";
import { Provider } from "./RouteTransitionContext";

export function RouteTransition(props: React.PropsWithChildren<unknown>) {
  const { children } = props;
  const [logger] = React.useState(new Logger("RouteTransition"));
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();

  function start(url: string): void {
    logger.trace(`enabling loading state for [url=${url}]`);
    setLoading((prev) => !prev);
  }

  function stop(url: string): void {
    logger.trace(`disabling loading state for [url=${url}]`);
    setLoading((prev) => !prev);
  }

  function failed(_: unknown, url: string): void {
    logger.error(`encountered an error on route transition to [url=${url}]`);
    stop(url);
  }

  React.useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", failed);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", failed);
    };
  }, []);

  return (
    <Provider value={{ isLoading }}>
      {children}
      <Box
        aria-live="assertive"
        sx={{
          position: "fixed",
          display: "flex",
          width: isLoading ? "100vw" : "1px",
          height: isLoading ? "100vh" : "1px",
          left: 0,
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <Box component="p" sx={{ color: "white" }}>
            Loading new page
          </Box>
        )}
      </Box>
    </Provider>
  );
}
