import { Container } from "@mui/material";
import { PropsWithChildren } from "react";

export function Main(props: PropsWithChildren<unknown>): JSX.Element {
  return (
    <Container component="main" maxWidth="md" sx={{ ml: 0 }}>
      {props.children}
    </Container>
  );
}
