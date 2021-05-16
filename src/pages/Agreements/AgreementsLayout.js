/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getDirectionTitleFromState } from "../../utils/directions";
import DynamicDirection from "../../components/shared/DynamicDirection";
import AgreementsListView from "./AgreementsListView";
import CreateForm from "../../components/agreements/CreateForm";
import AgreementProfile from "./AgreementProfile";
import { getAgreements, getAgreement } from "../../actions/agreements";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

const AgreementsLayout = memo(({ location, history, match }) => {
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
      refresh: directionaTitle ? getAgreement : getAgreements,
    });
  }, [location.pathname, match.path, location.search]);

  return (
    <section className={classes.container}>
      <DynamicDirection
        path={match.path}
        routes={routes}
        actions={actions}
        location={location}
        model="agreement"
        modalComponents={{
          add: CreateForm,
        }}
      />
      <Switch>
        <Route exact path={match.path} component={AgreementsListView} />
        <Route path={`${match.path}/:id`} component={AgreementProfile} />
      </Switch>
    </section>
  );
});

export default AgreementsLayout;

AgreementsLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
