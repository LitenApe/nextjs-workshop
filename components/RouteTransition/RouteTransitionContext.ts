import * as React from "react";

interface RouteTransitionContext {
  isLoading: boolean;
}

const context = React.createContext<RouteTransitionContext>({
  isLoading: false,
});

export const { Provider } = context;
