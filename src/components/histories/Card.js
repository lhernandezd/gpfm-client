import React, { memo } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography, Accordion, AccordionSummary, AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  coreInfo: {},
  accordionSection: {
    padding: "20px 0"
  },
}));

const UpdatedAccordionSummary = withStyles({
  root: {
    padding: "0"
  },
  content: {
    '&$expanded': {
      margin: "12px 0",
    },
  },
})(AccordionSummary);

const Card = memo(({ history }) => {
  const classes = useStyles();
  const historyId = get(history, "iid");
  const patientFirstName = get(history, "patient.first_name", "");
  const patientLastName = get(history, "patient.last_name", "");
  const patientFullName = `${patientFirstName} ${patientLastName}`;
  const patientDocumentType = get(history, "patient.document_type", "");
  const patientDocument = get(history, "patient.document", "");
  const accordionSections = [
    { id: "summary", name: "Basic Information" },
    { id: "detail", name: "Details" },
  ];
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
      <div className={classes.accordionSection}>
        {accordionSections.map((section) => (
          <Accordion key={section.id} elevation={0}>
            <UpdatedAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" component="p">{section.name}</Typography>
            </UpdatedAccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
});

export default Card;

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
