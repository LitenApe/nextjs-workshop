import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import * as React from "react";

export default function SignOut() {
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/auth/user", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem("authentication");
        router.push("/");
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Sign In | NextJS Workshop</title>
      </Head>
      <Box>
        <Box>
          <h1>Sign Out</h1>
        </Box>
      </Box>
    </>
  );
}
