/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getPatients } from "../../actions/patients";
import Table from "../../components/patients/Table";

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

export default function PatientsListView({ location, history }) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const classes = useStyles();
  const baseOrder = {
    document: "asc",
  };

  useEffect(() => {
    dispatch(getPatients({
      order: baseOrder,
    }));
  }, [dispatch]);

  const onPatientClick = (id, user) => {
    const firstName = get(user, "first_name");
    const lastName = get(user, "last_name");
    history.push(`${location.pathname}/${id}`, {
      directionName: `${firstName}_${lastName}`,
      patient_id: id,
    });
  };

  return (
    <>
      {patients.isFetching
        ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )
        : (
          <Fade in={!patients.isFetching}>
            <Table
              patients={patients}
              fetchFunc={getPatients}
              onRowClick={onPatientClick}
              baseOrder
            />
          </Fade>
        )}
    </>
  );
}

PatientsListView.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
