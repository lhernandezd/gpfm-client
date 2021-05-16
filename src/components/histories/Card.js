/* eslint-disable react/no-array-index-key */
import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import {
  get, startCase, capitalize, toUpper,
} from "lodash";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography, Accordion, AccordionSummary, AccordionDetails,
  Grid, List, ListItem, ListItemText, ListItemIcon, IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ModalForm from "../shared/ModalForm";
import UpdateHistory from "./UpdateForm";

const useStyles = makeStyles(() => ({
  coreInfo: {},
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  bold: { fontWeight: 500 },
  cardTitle: { paddingBottom: 20 },
  accordionSection: {
    padding: "20px 0",
  },
  iconRoot: {
    minWidth: "35px",
  },
}));

const UpdatedAccordionSummary = withStyles({
  root: {
    padding: "0",
  },
})(AccordionSummary);

const handleGridWidth = (sectionID) => {
  const defaultWidths = { sm: 4, md: 3 };
  return sectionID === "detail" ? { sm: 12, xs: 12 } : defaultWidths;
};

const handleFields = (fieldValue) => {
  if (Array.isArray(fieldValue)) {
    const codesArray = fieldValue.map((code) => {
      const cieCode = code.code;
      const cieCodeDescription = code.description;
      return `${cieCode} - ${cieCodeDescription}`;
    });
    return codesArray;
  }
  return capitalize(fieldValue);
};

const Card = memo(({ history }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const historyId = get(history, "iid");
  const patientFirstName = get(history, "patient.first_name", "");
  const patientLastName = get(history, "patient.last_name", "");
  const patientFullName = `${patientFirstName} ${patientLastName}`;
  const patientDocumentType = get(history, "patient.document_type", "");
  const patientDocument = get(history, "patient.document", "");
  const accordionSections = [
    {
      id: "summary",
      name: "Basic Information",
      fields: [
        "weight", "height", "imc", "heart_rate",
        "blood_pressure", "breath_frequency", "temperature", "cause",
      ],
    },
    {
      id: "detail",
      name: "Details",
      fields: [
        "codes", "medical_evolution", "background", "medicine", "exam_performed",
        "reason", "physical_exam", "treatment_plan", "medical_formula", "note", "consent",
        "current_illness", "current_treatment",
      ],
    },
  ];

  return (
    <>
      <div className={classes.coreInfo}>
        <div className={classes.header}>
          <Typography className={classes.cardTitle} variant="h5" component="h2">
            History #
            {" "}
            {historyId}
          </Typography>
          <IconButton
            edge="end"
            aria-label="edit history"
            onClick={handleModal}
            color="primary"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="coreInfoItem">
          <Typography className={classes.bold} variant="subtitle1" component="span">
            Patient Name:
            {" "}
          </Typography>
          <Typography variant="subtitle1" component="span">
            {patientFullName}
          </Typography>
        </div>
        <div className="coreInfoItem">
          <Typography className={classes.bold} variant="subtitle1" component="span">
            Patient Identification:
            {" "}
          </Typography>
          <Typography variant="subtitle1" component="span">
            {`${toUpper(patientDocumentType)} ${patientDocument}`}
          </Typography>
        </div>
      </div>
      <div className={classes.accordionSection}>
        {accordionSections.map((section) => (
          <Accordion key={section.id} elevation={0}>
            <UpdatedAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2" component="p">{section.name}</Typography>
            </UpdatedAccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {section.fields.map((field, index) => {
                  const gridWidths = handleGridWidth(section.id);
                  const fieldName = field === "codes" ? "CIE-10 Codes" : startCase(field);
                  const fieldValue = handleFields(history[field]);
                  return (
                    <Grid item xs {...gridWidths} key={`${history.id}_${index}`}>
                      <Typography variant="body1" component="p" gutterBottom>
                        {fieldName}
                      </Typography>
                      {Array.isArray(fieldValue)
                        ? (
                          <List dense>
                            {fieldValue.map((item) => (
                              <ListItem key={index}>
                                <ListItemIcon classes={{ root: classes.iconRoot }}>
                                  <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={item} />
                              </ListItem>
                            ))}
                          </List>
                        )
                        : (
                          <Typography variant="body2" component="p">
                            {fieldValue}
                          </Typography>
                        )}
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <ModalForm
        formComponent={() => <UpdateHistory history={history} toggleForm={handleModal} />}
        modalProps={{ maxWidth: "md" }}
        title="Edit History"
        handleModal={handleModal}
        open={openModal}
      />
    </>
  );
});

export default Card;

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
