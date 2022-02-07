import { Container, List, ListItem } from "@mui/material";
import Link from "next/link";
import * as React from "react";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/post",
    label: "Posts",
  },
  {
    href: "/draft",
    label: "Draft",
  },
  {
    href: "/auth/signin",
    label: "Sign In",
  },
  {
    href: "/auth/signout",
    label: "Sign Out",
  },
];

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
        {links.map((link) => (
          <ListItem
            key={`navigation-bar_${link.label}`}
            sx={{ width: "fit-content" }}
          >
            <Link href={link.href}>{link.label}</Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
