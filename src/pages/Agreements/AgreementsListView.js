/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { startCase } from "lodash";
import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getAgreements } from "../../actions/agreements";
import Table from "../../components/agreements/Table";

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

export default function AgreementsListView({ location, history }) {
  const dispatch = useDispatch();
  const agreements = useSelector((state) => state.agreements);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAgreements());
  }, [dispatch]);

  const onAgreementClick = (id, name) => {
    history.push(`${location.pathname}/${id}`, {
      directionName: `${startCase(name)}`,
      entity_id: id,
    });
  };

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
            <Table entities={agreements} fetchFunc={getAgreements} onRowClick={onAgreementClick} />
          </Fade>
        )}
    </>
  );
}

AgreementsListView.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
