/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, CircularProgress, Fade,
} from "@material-ui/core";
import { getEntity } from "../../actions/entities";
import EntityProfileCard from "../../components/entities/ProfileCard";

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

const EntityProfile = memo(({ match }) => {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getEntity(get(match, "params.id")));
  }, [dispatch]);

  const entityData = get(entities, "entity");
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
            <div>
              <Paper className={classes.paperContainer} square>
                <EntityProfileCard entity={entityData} />
              </Paper>
            </div>
          </Fade>
        )}
    </>
  );
});

export default EntityProfile;

EntityProfile.propTypes = {
  match: PropTypes.object.isRequired,
};
