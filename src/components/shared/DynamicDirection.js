/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { startCase, get } from "lodash";
import { useDispatch } from "react-redux";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  Paper, Breadcrumbs, Typography, Link,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const useStyles = makeStyles((theme) => ({
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
  icon: {
    "&:hover": {
      color: fade(theme.palette.primary.light, 1),
    },
  },
}));

const MainDirection = ({
  refresh, classes, text, actions, state, model,
}) => {
  const dispatch = useDispatch();
  const refreshAction = get(actions, "refresh", false);
  const refreshID = get(state, `${model}_id`, "");
  return (
    <>
      <Typography color="textPrimary" variant="subtitle1" component="p" className={classes.title}>
        {startCase(text)}
      </Typography>
      {refresh && <AutorenewIcon className={classes.icon} fontSize="small" color="primary" onClick={() => refreshAction && dispatch(refreshAction(refreshID))} />}
    </>
  );
};

const DynamicDirection = memo(({
  routes, actions, views, refresh, location, model,
}) => {
  const classes = useStyles();
  const routesLength = routes.length;
  const locationState = get(location, "state", false);

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
          ? (
            <MainDirection
              refresh={refresh}
              classes={classes}
              text={routes[0].title}
              actions={actions}
              state={locationState}
              model={model}
            />
          )
          : routes.map((route, index) => {
            if (index === routesLength - 1) {
              return (
                <MainDirection
                  key={index}
                  refresh={refresh}
                  classes={classes}
                  text={route.title}
                  actions={actions}
                  state={locationState}
                  model={model}
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
  actions: PropTypes.object,
  views: PropTypes.array,
  refresh: PropTypes.bool,
  location: PropTypes.object,
  model: PropTypes.string,
};

DynamicDirection.defaultProps = {
  routes: [],
  actions: null,
  views: [],
  refresh: false,
  model: null,
  location: null,
};

MainDirection.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  refresh: PropTypes.bool,
  model: PropTypes.string,
  actions: PropTypes.object,
  state: PropTypes.any.isRequired,
};

MainDirection.defaultProps = {
  refresh: false,
  model: null,
  actions: {},
};
