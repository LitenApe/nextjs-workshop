import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";

import * as React from "react";

export default function SignIn() {
  const router = useRouter();
  const [identity, setIdentity] = React.useState("");
  const [secret, setSecret] = React.useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    fetch("/api/auth/user", {
      method: "POST",
      body: JSON.stringify({
        identity,
        secret,
      }),
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("authentication", "true");
        router.push("/");
      }
    });
  }

  return (
    <>
      <Head>
        <title>Sign In | NextJS Workshop</title>
      </Head>
      <Box>
        <Box>
          <h1>Sign In</h1>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={onSubmit}
          >
            <TextField
              type="text"
              label="Username"
              value={identity}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setIdentity(() => event.target.value)
              }
              sx={{ mt: 2, mb: 2 }}
              required
            />
            <TextField
              type="password"
              label="Password"
              value={secret}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSecret(() => event.target.value)
              }
              sx={{ mt: 2, mb: 2 }}
              required
            />
            <Button type="submit" sx={{ mt: 2, mb: 2 }} variant="contained">
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
