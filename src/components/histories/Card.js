import React, { memo } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  coreInfo: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Card = memo(({ history }) => {
  const classes = useStyles();
  const historyId = get(history, "iid");
  const patientFirstName = get(history, "patient.first_name", "");
  const patientLastName = get(history, "patient.last_name", "");
  const patientFullName = `${patientFirstName} ${patientLastName}`;
  const patientDocumentType = get(history, "patient.document_type", "");
  const patientDocument = get(history, "patient.document", "");
  return (
    <>
      <div className={classes.coreInfo}>
        <Typography variant="h5" component="h2">
          History #
          {" "}
          {historyId}
        </Typography>
        <Typography variant="subtitle1" component="p">
          Patient Name:
          {" "}
          {patientFullName}
        </Typography>
        <Typography variant="subtitle1" component="p">
          Patient Identification:
          {" "}
          {`${patientDocumentType} ${patientDocument}`}
        </Typography>
      </div>
    </>
  );
});

export default Card;

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
