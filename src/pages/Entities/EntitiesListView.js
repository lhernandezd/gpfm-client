/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { startCase } from "lodash";
import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getEntities } from "../../actions/entities";
import Table from "../../components/entities/Table";

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

export default function EntitiesListView({ location, history }) {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getEntities());
  }, [dispatch]);

  const onEntityClick = (id, name) => {
    history.push(`${location.pathname}/${id}`, {
      directionName: `${startCase(name)}`,
      entity_id: id,
    });
  };

  return (
    <>
      {entities.isFetching
        ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )
        : (
          <Fade in={!entities.isFetching}>
            <Table entities={entities} fetchFunc={getEntities} onRowClick={onEntityClick} />
          </Fade>
        )}
    </>
  );
}

EntitiesListView.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
