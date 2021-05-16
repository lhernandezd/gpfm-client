/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, CircularProgress, Fade,
} from "@material-ui/core";
import { getAgreement } from "../../actions/agreements";
import AgreementsProfileCard from "../../components/agreements/ProfileCard";

const useStyles = makeStyles(() => ({
  paperContainer: {
    display: "flex",
    padding: "20px 40px",
    marginBottom: 20,
    flexDirection: "column",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

const AgreementsProfile = memo(({ match }) => {
  const dispatch = useDispatch();
  const agreements = useSelector((state) => state.agreements);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAgreement(get(match, "params.id")));
  }, [dispatch]);

  const agreementData = get(agreements, "agreement");
  return (
    <>
      {agreements.isFetching
        ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )
        : (
          <Fade in={!agreements.isFetching}>
            <div>
              <Paper className={classes.paperContainer} square>
                <AgreementsProfileCard agreement={agreementData} />
              </Paper>
            </div>
          </Fade>
        )}
    </>
  );
});

export default AgreementsProfile;

AgreementsProfile.propTypes = {
  match: PropTypes.object.isRequired,
};
