/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeGrid from "./HomeGrid";
import HomeList from "./HomeList";
import DynamicDirection from "../../components/shared/DynamicDirection";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

const HomeLayout = memo(({ location, history, match }) => {
  const classes = useStyles();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const arrangeRoutes = pathnames.map((item, index) => ({
      title: item,
      path: index === 0 ? match.path : `${match.path}/${item}`,
    }));
    setRoutes(arrangeRoutes);
  }, [location.pathname, match.path]);

  return (
    <section className={classes.container}>
      <DynamicDirection path={match.path} routes={routes} refresh />
      <Switch>
        <Route exact path={match.path} component={HomeGrid} />
        <Route path={`${match.path}/:id`} component={HomeList} />
      </Switch>
    </section>
  );
});

export default HomeLayout;

HomeLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
