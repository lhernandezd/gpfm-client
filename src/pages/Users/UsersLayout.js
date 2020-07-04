/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getDirectionTitle } from "../../utils/directions";
import DynamicDirection from "../../components/shared/DynamicDirection";
import UsersGrid from "./UsersGrid";
import UserProfile from "./UserProfile";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

const UsersLayout = memo(({ location, history, match }) => {
  const classes = useStyles();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const directionaTitle = getDirectionTitle(location.search);
    const pathnames = location.pathname.split("/").filter((x) => x);
    const arrangeRoutes = pathnames.map((item, index) => ({
      title: index !== 0 && directionaTitle ? directionaTitle : item,
      path: index === 0 ? match.path : `${match.path}/${item}`,
    }));
    setRoutes(arrangeRoutes);
  }, [location.pathname, match.path, location.search]);

  return (
    <section className={classes.container}>
      <DynamicDirection path={match.path} routes={routes} refresh />
      <Switch>
        <Route exact path={match.path} component={UsersGrid} />
        <Route path={`${match.path}/:id`} component={UserProfile} />
      </Switch>
    </section>
  );
});

export default UsersLayout;

UsersLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
