import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { userState } from "../../atoms/index";

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
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className={classes.layout}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography variant="h1" component="h2">
          Home
          {" "}
          {user.data.email}
        </Typography>
      </Container>
    </div>
  );
}
