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

const AgreementProfileCard = memo(({ agreement }) => {
  const classes = useStyles();

  const agreementId = get(agreement, "iid");
  const agreementName = get(agreement, "name");
  const agreementCode = get(agreement, "code");

  return (
    <div className={classes.coreInfo}>
        <div className={classes.header}>
          <Typography className={classes.cardTitle} variant="h5" component="h2">
            Agreement #
            {" "}
            {agreementId}
          </Typography>
        </div>
        <div className="coreInfoItem">
          <Typography className={classes.bold} variant="subtitle1" component="span">
            Agreement Name:
            {" "}
          </Typography>
          <Typography variant="body1" component="span">
            {startCase(agreementName)}
          </Typography>
        </div>
        <div className="coreInfoItem">
          <Typography className={classes.bold} variant="subtitle1" component="span">
            Agreement Code:
            {" "}
          </Typography>
          <Typography variant="body1" component="span">
            {agreementCode}
          </Typography>
        </div>
      </div>
  );
});

export default AgreementProfileCard;

AgreementProfileCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  agreement: PropTypes.object.isRequired,
};
