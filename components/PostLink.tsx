import { Card, CardActions, CardContent, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  readonly id: number;
  readonly title: string;
  readonly level?: 2 | 3 | 4 | 5 | 6;
}

export function PostLink(props: Props): JSX.Element {
  const { title, id, level = 3 } = props;
  const router = useRouter();

  return (
    <Card
      component="article"
      sx={{ m: 2, ml: 0, cursor: "pointer", width: "100%" }}
      onClick={() => router.push(`/post/${id}`)}
    >
      <CardContent component="header">
        <Typography component={`h${level}`}>{title}</Typography>
      </CardContent>
      <CardActions sx={{ pl: 2, pb: 2 }}>
        <NextLink href={`/post/${id}`}>Read blogpost</NextLink>
      </CardActions>
    </Card>
  );
}
