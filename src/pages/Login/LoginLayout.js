import React from "react";
import {
  Container, Paper, Box, Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./LoginForm";
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

export default function LoginLayout() {
  const classes = useStyles();
  const vertical = "top";
  const horizontal = "center";
  return (
    <div className={classes.layout}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          // open={open}
          message="I love snacks"
          key={vertical + horizontal}
          autoHideDuration={2000}
        />

        <Paper elevation={3}>
          <LoginForm />
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
