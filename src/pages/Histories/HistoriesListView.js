/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getHistories } from "../../actions/histories";
import Table from "../../components/histories/Table";

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

export default function HistoriesListView({ location, history }) {
  const dispatch = useDispatch();
  const histories = useSelector((state) => state.histories);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getHistories());
  }, [dispatch]);

  const onHistoryClick = (id, num) => {
    history.push(`${location.pathname}/${id}`, {
      directionName: `History # ${num}`,
      history_id: id,
    });
  };

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
            <Table histories={histories} fetchFunc={getHistories} onRowClick={onHistoryClick} />
          </Fade>
        )}
    </>
  );
}

HistoriesListView.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
