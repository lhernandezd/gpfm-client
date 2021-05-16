/* eslint-disable react/no-array-index-key */
import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  get, startCase,
} from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  coreInfo: {},
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  bold: { fontWeight: 500 },
  cardTitle: { paddingBottom: 20 },
}));

const EntityProfileCard = memo(({ entity }) => {
  const classes = useStyles();

  const entityId = get(entity, "iid");
  const entityName = get(entity, "name", "");
  const entityNit = get(entity, "nit", "");

  return (
    <>
      <div className={classes.coreInfo}>
        <div className={classes.header}>
          <Typography className={classes.cardTitle} variant="h5" component="h2">
            Entity #
            {" "}
            {entityId}
          </Typography>
        </div>
        <div className="coreInfoItem">
          <Typography className={classes.bold} variant="subtitle1" component="span">
            Entity Name:
            {" "}
          </Typography>
          <Typography variant="body1" component="span">
            {startCase(entityName)}
          </Typography>
        </div>
        <div className="coreInfoItem">
          <Typography className={classes.bold} variant="subtitle1" component="span">
            Entity NIT #:
            {" "}
          </Typography>
          <Typography variant="body1" component="span">
            {entityNit}
          </Typography>
        </div>
      </div>
    </>
  );
});

export default EntityProfileCard;

EntityProfileCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
};
