import React from "react";
import {
  Container, Paper, Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RecoverForm from "./RecoverForm";
import Copyright from "../../components/Copyright";

const useStyles = makeStyles(() => ({
  layout: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function RecoverLayout() {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Paper elevation={3}>
          <RecoverForm />
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
