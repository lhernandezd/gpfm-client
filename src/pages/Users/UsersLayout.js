import React from "react";
import { Typography } from "@material-ui/core";
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
    <section className={classes.container}>
      <Typography variant="h1" component="h2">
        Users
      </Typography>
    </section>
  );
}
