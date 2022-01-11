/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { format as formatDate, parseISO } from "date-fns";
import {
  get, startCase, capitalize, toUpper,
} from "lodash";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography, Accordion, AccordionSummary, AccordionDetails,
  Grid, IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import ModalForm from "../shared/ModalForm";
import UpdatePatient from "./UpdateForm";

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
  subSectionData: {
    margin: "20px 0",
  },
}));

const UpdatedAccordionSummary = withStyles({
  root: {
    padding: "0",
  },
})(AccordionSummary);

const handleGridWidth = (sectionID) => {
  const defaultWidths = { sm: 4, md: 3 };
  return sectionID === "agreement" || sectionID === "contacts" ? { sm: 12, xs: 12 } : defaultWidths;
};

const handleGridDirection = (sectionID) => (sectionID === "summary" ? "column" : "row");

const handleFieldConversion = (value, field) => {
  if (value) {
    if (field === "birth_date") return formatDate(parseISO(value), "dd/MM/yyyy");
    if (field === "city") return `${value.name}, ${value.state?.name}`;
    return capitalize(value);
  }
};

const handleFields = (fieldValue, subFields) => {
  if (Array.isArray(fieldValue)) {
    const fieldArray = fieldValue.map((item) => {
      const customObj = {};
      subFields.forEach((field) => {
        customObj[field] = handleFieldConversion(item[field], field);
      });
      return customObj;
    });
    return fieldArray;
  }
  if (typeof fieldValue === "object") {
    if (subFields.length) {
      const customObj = {};
      subFields.forEach((field) => {
        customObj[field] = handleFieldConversion(fieldValue[field], field);
      });
      return customObj;
    }
    return fieldValue;
  }
  return fieldValue;
};

const PatientsProfileCard = memo(({ patient }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const patientId = get(patient, "iid");
  const firstName = get(patient, "first_name", "");
  const lastName = get(patient, "last_name", "");
  const fullName = `${firstName} ${lastName}`;
  const documentType = get(patient, "document_type", "");
  const document = get(patient, "document", "");
  const accordionSections = [
    {
      id: "summary",
      name: "Basic Information",
      fields: [
        "city", "address", "birth_date", "gender", "phone_number",
        "email", "neighborhood", "occupation", "civil_status", "blood_type",
      ],
    },
    {
      id: "agreement",
      name: "Agreement Information",
      fields: [
        "agreement",
      ],
      subFields: [
        "name", "code",
      ],
    },
    {
      id: "contacts",
      name: "Contacts Information",
      fields: [
        "contacts",
      ],
      subFields: [
        "first_name", "last_name", "email",
        "phone_number", "occupation",
      ],
    },
  ];

  return patient && (
    <>
      <div className={classes.coreInfo}>
        <div className={classes.header}>
          <Typography className={classes.cardTitle} variant="h5" component="h2">
            Patient #
            {" "}
            {patientId}
          </Typography>
          <IconButton
            edge="end"
            aria-label="edit patient"
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
          <Typography variant="body1" component="span">
            {startCase(fullName)}
          </Typography>
        </div>
        <div className="coreInfoItem">
          <Typography className={classes.bold} variant="subtitle1" component="span">
            Patient Identification:
            {" "}
          </Typography>
          <Typography variant="body1" component="span">
            {`${toUpper(documentType)} ${document}`}
          </Typography>
        </div>
      </div>
      <div className={classes.accordionSection}>
        {accordionSections.map((section) => (
          <Accordion key={section.id} elevation={0}>
            <UpdatedAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.bold} variant="subtitle1" component="p">{section.name}</Typography>
            </UpdatedAccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {section.fields.map((field, index) => {
                  const gridWidths = handleGridWidth(section.id);
                  const gridDirection = handleGridDirection(section.id);
                  const fieldName = startCase(field);
                  const fieldValue = handleFields(get(patient, `${field}`, ""), get(section, "subFields", []));
                  return (
                    <Grid container item xs {...gridWidths} direction={gridDirection} key={`${patient.id}_${index}`}>
                      {Array.isArray(fieldValue)
                        ? fieldValue.map((fieldItem, fieldIndex) => (
                          <>
                            <Grid item xs={12}>
                              <Typography variant="body1" component="p" gutterBottom>
                                {`${fieldName} # ${fieldIndex + 1}`}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              container
                              xs={12}
                              spacing={3}
                              className={classes.subSectionData}
                            >
                              {section.subFields.map((subFieldItem) => (
                                <Grid item xs={12} sm={4} md={3}>
                                  <Typography variant="body1" component="p" gutterBottom>
                                    {startCase(subFieldItem)}
                                  </Typography>
                                  <Typography variant="body2" component="p">
                                    {fieldItem[subFieldItem]}
                                  </Typography>
                                </Grid>
                              ))}
                            </Grid>
                          </>
                        )) : (
                          typeof fieldValue === "object" && field !== "city"
                            ? (
                              section.subFields.map((subFieldItem) => (
                                <Grid item xs={12} sm={4} md={3}>
                                  <Typography variant="body1" component="p" gutterBottom>
                                    {startCase(subFieldItem)}
                                  </Typography>
                                  <Typography variant="body2" component="p">
                                    {fieldValue[subFieldItem]}
                                  </Typography>
                                </Grid>
                              ))
                            )
                            : (
                              <>
                                <Typography variant="body1" component="p" gutterBottom>
                                  {fieldName}
                                </Typography>
                                <Typography variant="body2" component="p">
                                  {handleFieldConversion(fieldValue, field)}
                                </Typography>
                              </>
                            )
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
        formComponent={() => <UpdatePatient patient={patient} toggleForm={handleModal} />}
        modalProps={{ maxWidth: "md" }}
        title="Edit Patient"
        handleModal={handleModal}
        open={openModal}
      />
    </>
  );
});

export default PatientsProfileCard;

PatientsProfileCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  patient: PropTypes.object.isRequired,
};
