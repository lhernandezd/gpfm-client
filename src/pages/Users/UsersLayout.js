import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function UsersLayout() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography variant="h1" component="h2">
        Users
      </Typography>
    </Container>
  );
}
