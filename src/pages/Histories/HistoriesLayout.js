/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getDirectionTitleFromState } from "../../utils/helpers/directions";
import DynamicDirection from "../../components/shared/DynamicDirection";
import HistoriesListView from "./HistoriesListView";
import CreateForm from "../../components/histories/CreateForm";
import SortForm from "../../components/histories/SortForm";
import HistoryProfile from "./HistoryProfile";
import { getHistories, getHistory } from "../../actions/histories";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

const HistoriesLayout = memo(({ location, history, match }) => {
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
      refresh: directionaTitle ? getHistory : getHistories,
      sort: !directionaTitle && getHistories,
    });
  }, [location.pathname, match.path, location.search]);

  return (
    <section className={classes.container}>
      <DynamicDirection
        path={match.path}
        routes={routes}
        actions={actions}
        location={location}
        model="history"
        modalComponents={{
          add: CreateForm,
          sort: SortForm,
        }}
        modalProps={{
          maxWidth: "md",
        }}
      />
      <Switch>
        <Route exact path={match.path} component={HistoriesListView} />
        <Route path={`${match.path}/:id`} component={HistoryProfile} />
      </Switch>
    </section>
  );
});

export default HistoriesLayout;

HistoriesLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
