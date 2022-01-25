import { Container, Link as MUILink, List, ListItem } from "@mui/material";
import Link from "next/link";
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
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ListItem sx={{ width: "fit-content" }}>
          <MUILink component={Link} href="/">
            Home
          </MUILink>
        </ListItem>
        <ListItem sx={{ width: "fit-content" }}>
          <MUILink component={Link} href="/post">
            Posts
          </MUILink>
        </ListItem>
      </List>
    </Container>
  );
}
