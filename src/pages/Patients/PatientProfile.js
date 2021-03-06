/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { get, startCase, toUpper } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Typography, Avatar, CircularProgress, Fade,
} from "@material-ui/core";
import { getPatient } from "../../actions/patients";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    display: "flex",
    padding: "20px 40px",
    marginBottom: 20,
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

const UserProfile = memo(({ match }) => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);
  const classes = useStyles();
  const firstName = get(patients, "patient.first_name", "");
  const lastName = get(patients, "patient.last_name", "");
  const fullName = `${firstName} ${lastName}`;
  const documentType = get(patients, "patient.document_type", "");
  const document = get(patients, "patient.document", "");
  const email = get(patients, "patient.email", "");

  useEffect(() => {
    dispatch(getPatient(get(match, "params.id")));
  }, [dispatch]);

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
            <div>
              <Paper className={classes.paperContainer} square>
                <Avatar className={classes.avatar}>LH</Avatar>
                <div className={classes.basicInfo}>
                  <Typography variant="h5" component="h2">
                    {`${startCase(fullName)}`}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    {`${toUpper(documentType)}: ${document}`}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    {email}
                  </Typography>
                </div>
              </Paper>
            </div>
          </Fade>
        )}
    </>
  );
});

export default UserProfile;

UserProfile.propTypes = {
  match: PropTypes.object.isRequired,
};
