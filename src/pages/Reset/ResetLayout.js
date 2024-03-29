/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import {
  Container, Paper, Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ResetForm from "./ResetForm";
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

export default function ResetLayout({ routerProps }) {
  const classes = useStyles();
  const { match } = routerProps;
  return (
    <div className={classes.layout}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Paper elevation={3}>
          <ResetForm match={match} />
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

ResetLayout.propTypes = {
  routerProps: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
