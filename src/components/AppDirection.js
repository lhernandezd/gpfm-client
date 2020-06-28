import React, { memo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Breadcrumbs, Typography, Link,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const useStyles = makeStyles(() => ({
  paper: {
    height: 50,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    marginRight: 5,
  },
  icon: {
    fontSize: "1.2rem",
  },
}));

const AppDirection = memo(({ location }) => {
  const classes = useStyles();
  return location.pathname === "/home" ? (
    <Paper className={classes.paper} square>
      <Typography variant="subtitle1" component="p" className={classes.title}>
        Home
      </Typography>
      <AutorenewIcon size="small" color="primary" />
    </Paper>
  ) : (
    <Paper className={classes.paper} square>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
    </Paper>
  );
});

export default AppDirection;

AppDirection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
