/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getDirectionTitleFromState } from "../../utils/helpers/directions";
import DynamicDirection from "../../components/shared/DynamicDirection";
import EntitiesListView from "./EntitiesListView";
import CreateForm from "../../components/entities/CreateForm";
import EntityProfile from "./EntityProfile";
import { getEntities, getEntity } from "../../actions/entities";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

const EntitiesLayout = memo(({ location, history, match }) => {
  const classes = useStyles();
  const [routes, setRoutes] = useState([]);
  const [actions, setActions] = useState({});

  useEffect(() => {
    const directionaTitle = getDirectionTitleFromState(location.state);
    const pathnames = location.pathname.split("/").filter((x) => x);
    const arrangeRoutes = pathnames.map((item, index) => ({
      title: index !== 0 && directionaTitle ? directionaTitle : item,
      path: index === 0 ? match.path : `${match.path}/${item}`,
    }));
    setRoutes(arrangeRoutes);
    setActions({
      refresh: directionaTitle ? getEntity : getEntities,
    });
  }, [location.pathname, match.path, location.search]);

  return (
    <section className={classes.container}>
      <DynamicDirection
        path={match.path}
        routes={routes}
        actions={actions}
        location={location}
        model="entity"
        modalComponents={{
          add: CreateForm,
        }}
      />
      <Switch>
        <Route exact path={match.path} component={EntitiesListView} />
        <Route path={`${match.path}/:id`} component={EntityProfile} />
      </Switch>
    </section>
  );
});

export default EntitiesLayout;

EntitiesLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
