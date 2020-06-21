import React from "react";
import { useDispatch } from "react-redux";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../../actions/authentication";

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

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.layout}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography variant="h1" component="h2">
          Home
        </Typography>
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </div>
  );
}
