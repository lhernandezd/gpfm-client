/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DynamicDirection from "../../components/shared/DynamicDirection";
import AppointmentsCalendar from "./AppointmentsCalendar";
import CreateForm from "../../components/agreements/CreateForm";
import { getAppointments } from "../../actions/appointments";

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
    const pathnames = location.pathname.split("/").filter((x) => x);
    const arrangeRoutes = pathnames.map((item, index) => ({
      title: item,
      path: index === 0 ? match.path : `${match.path}/${item}`,
    }));
    setRoutes(arrangeRoutes);
    setActions({ refresh: getAppointments });
  }, [location.pathname, match.path]);

  return (
    <section className={classes.container}>
      <DynamicDirection
        path={match.path}
        routes={routes}
        actions={actions}
        location={location}
        model="appoinment"
        modalComponents={{
          add: CreateForm,
        }}
      />
      <AppointmentsCalendar />
    </section>
  );
});

export default AgreementsLayout;

AgreementsLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
