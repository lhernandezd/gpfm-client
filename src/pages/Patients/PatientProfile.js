/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, CircularProgress, Fade,
} from "@material-ui/core";
import { getPatient } from "../../actions/patients";
import PatientsProfileCard from "../../components/patients/PatientsProfileCard";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    display: "flex",
    padding: "20px 40px",
    marginBottom: 20,
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: 30,
    border: "1.5px solid white",
  },
  basicInfo: {
    marginLeft: 60,
    display: "flex",
    flexDirection: "column",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

const PatientProfile = memo(({ match }) => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPatient(get(match, "params.id")));
  }, [dispatch]);

  const patientData = get(patients, "patient");
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
            <Paper className={classes.paperContainer} square>
              <PatientsProfileCard patient={patientData} />
            </Paper>
          </Fade>
        )}
    </>
  );
});

export default PatientProfile;

PatientProfile.propTypes = {
  match: PropTypes.object.isRequired,
};
