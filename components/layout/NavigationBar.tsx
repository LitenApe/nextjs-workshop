import { Container, List, ListItem } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { isDefined } from "../../lib/isDefined";

const common = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/post",
    label: "Posts",
  },
];

const authenticated = [
  {
    href: "/draft",
    label: "Draft",
  },
  {
    href: "/auth/signout",
    label: "Sign Out",
  },
];

const unauthenticated = [
  {
    href: "/auth/signin",
    label: "Sign In",
  },
];

export function NavigationBar(): JSX.Element {
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const authorized = localStorage.getItem("authentication");
      setIsAuthorized(() => isDefined(authorized));
    } else {
      setIsAuthorized(() => false);
    }
  });

  const links = common.concat(isAuthorized ? authenticated : unauthenticated);

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
