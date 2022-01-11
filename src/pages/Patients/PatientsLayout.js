/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getDirectionTitleFromState } from "../../utils/helpers/directions";
import DynamicDirection from "../../components/shared/DynamicDirection";
import PatientsListView from "./PatientsListView";
import PatientProfile from "./PatientProfile";
import CreateForm from "../../components/patients/CreateForm";
import { getPatients, getPatient } from "../../actions/patients";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

const PatientsLayout = memo(({ location, history, match }) => {
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
      refresh: directionaTitle ? getPatient : getPatients,
    });
  }, [location.pathname, match.path, location.search]);

  return (
    <section className={classes.container}>
      <DynamicDirection
        path={match.path}
        routes={routes}
        actions={actions}
        location={location}
        model="patient"
        modalComponents={{
          add: CreateForm,
        }}
        modalProps={{
          maxWidth: "md",
        }}
      />
      <Switch>
        <Route exact path={match.path} component={PatientsListView} />
        <Route path={`${match.path}/:id`} component={PatientProfile} />
      </Switch>
    </section>
  );
});

export default PatientsLayout;

PatientsLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
