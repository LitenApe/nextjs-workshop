import { Container } from "@mui/material";

export function Footer(): JSX.Element {
  return (
    <Container
      component="footer"
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
      footer
    </Container>
  );
}
