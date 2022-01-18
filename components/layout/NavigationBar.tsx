import { Container } from "@mui/material";
import * as React from "react";

export function NavigationBar(): JSX.Element {
  return (
    <Container
      component="nav"
      maxWidth="xl"
      sx={{
        pl: 2,
        pr: 2,
        pt: 3,
        pb: 3,
        color: (theme) => theme.palette.common.white,
        backgroundColor: (theme) => theme.palette.primary.dark,
      }}
    >
      Navigation bar
    </Container>
  );
}
