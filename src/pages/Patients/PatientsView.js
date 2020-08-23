/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getPatients } from "../../actions/patients";
import Card from "../../components/patients/Card";

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

export default function PatientsGrid({ location, history }) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPatients());
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
            <Grid container spacing={3}>
              {patients.data.map((patient) => (
                <Grid item xs sm={6} md={4} key={patient.id}>
                  <Card patient={patient} onClickCard={onPatientClick} />
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
    </>
  );
}

PatientsGrid.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
