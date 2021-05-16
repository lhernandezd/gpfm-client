/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, CircularProgress, Fade,
} from "@material-ui/core";
import { getHistory } from "../../actions/histories";
import HistoryCard from "../../components/histories/Card";

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

const HistoryProfile = memo(({ match }) => {
  const dispatch = useDispatch();
  const histories = useSelector((state) => state.histories);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getHistory(get(match, "params.id")));
  }, [dispatch]);

  const historyData = get(histories, "history");
  return (
    <>
      {histories.isFetching
        ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )
        : (
          <Fade in={!histories.isFetching}>
            <div>
              <Paper className={classes.paperContainer} square>
                <HistoryCard history={historyData} />
              </Paper>
            </div>
          </Fade>
        )}
    </>
  );
});

export default HistoryProfile;

HistoryProfile.propTypes = {
  match: PropTypes.object.isRequired,
};
