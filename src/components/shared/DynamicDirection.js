/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { startCase } from "lodash";
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
  breadcrumbItem: {
    display: "flex",
    alignItems: "center",
  },
}));

const MainDirection = ({
  refresh, classes, text,
}) => (
  <>
    <Typography color="textPrimary" variant="subtitle1" component="p" className={classes.title}>
      {startCase(text)}
    </Typography>
    {refresh && <AutorenewIcon fontSize="small" color="primary" />}
  </>
);

const DynamicDirection = memo(({
  routes, actions, views, refresh,
}) => {
  const classes = useStyles();
  const routesLength = routes.length;

  return routesLength > 0 && (
    <Paper className={classes.paper} square>
      <Breadcrumbs
        classes={{
          li: classes.breadcrumbItem,
        }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {routesLength === 1
          ? <MainDirection refresh={refresh} classes={classes} text={routes[0].title} />
          : routes.map((route, index) => {
            if (index === routesLength - 1) {
              return (
                <MainDirection
                  key={index}
                  refresh={refresh}
                  classes={classes}
                  text={route.title}
                />
              );
            }
            return (
              <Link key={index} color="inherit" component={RouterLink} to={route.path}>
                {startCase(route.title)}
              </Link>
            );
          })}
      </Breadcrumbs>
    </Paper>
  );
});

export default DynamicDirection;

DynamicDirection.propTypes = {
  routes: PropTypes.array,
  actions: PropTypes.array,
  views: PropTypes.array,
  refresh: PropTypes.bool,
};

DynamicDirection.defaultProps = {
  routes: [],
  actions: [],
  views: [],
  refresh: false,
};

MainDirection.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  refresh: PropTypes.bool,
};

MainDirection.defaultProps = {
  refresh: false,
};
