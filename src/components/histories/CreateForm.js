import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  Grid,
} from "@material-ui/core";
import { Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { createHistory, getHistories } from "../../actions/histories";
import parseFormValues from "../../utils/parseFormValues";
import DynamicSelectField from "../form/DynamicSelectField";
import { getCodes } from "../../actions/codes";
import { getPatients } from "../../actions/patients";
import { FormikStepper, FormikStep } from "../form/FormikStepForm";

const initialValues = {
  weight: 1,
  height: 1,
  imc: 1,
  heart_rate: 0,
  blood_pressure: 0,
  breath_frequency: 0,
  temperature: 0,
  cause: "",
  medical_evolution: "",
  background: "",
  medicine: "",
  exam_performed: "",
  reason: "",
  physical_exam: "",
  treatment_plan: "",
  medical_formula: "",
  note: "",
  consent: "",
  current_illness: "",
  current_treatment: "",
};

const DetailSchema = Yup.object().shape({
  weight: Yup.number(),
  height: Yup.number(),
  imc: Yup.number(),
  heart_rate: Yup.number(),
  blood_pressure: Yup.number(),
  breath_frequency: Yup.number(),
  temperature: Yup.number(),
  cause: Yup.string(),
  medical_evolution: Yup.string(),
  background: Yup.string(),
  medicine: Yup.string(),
  exam_performed: Yup.string(),
  reason: Yup.string(),
  physical_exam: Yup.string(),
  treatment_plan: Yup.string(),
  medical_formula: Yup.string(),
  note: Yup.string(),
  consent: Yup.string(),
  current_illness: Yup.string(),
  current_treatment: Yup.string(),
});

const CreateForm = ({ toggleForm }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const valuesUpdated = parseFormValues(values);
    await dispatch(createHistory(valuesUpdated));
    await dispatch(getHistories());
    toggleForm();
  };

  const onFieldChange = (e, setFieldValue, values) => {
    if (e.target.value) {
      let imc;
      switch (e.target.name) {
        case "weight": {
          imc = parseFloat(e.target.value) / values.height ** 2;
          break;
        }
        case "height": {
          imc = values.weight / parseFloat(e.target.value) ** 2;
          break;
        }
        default: break;
      }
      setFieldValue("imc", Math.floor(imc * 100) / 100);
      setFieldValue(e.target.name, parseFloat(e.target.value));
    } else {
      setFieldValue(e.target.name, "");
    }
  };

  return (
    <FormikStepper
      validationSchema={DetailSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      toggleAction={toggleForm}
    >
      <FormikStep label="Basic Information">
        {(stepProps) => (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <DynamicSelectField
                field="patient_id"
                reduxField="patients"
                label="Patient"
                fetchFunc={getPatients}
                optionField="label"
                touched={stepProps.touched}
                errors={stepProps.errors}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Field
                component={TextField}
                id="weight"
                label="Weight (Kg)"
                name="weight"
                fullWidth
                type="number"
                step="any"
                InputProps={
                  { onChange: (e) => onFieldChange(e, stepProps.setFieldValue, stepProps.values) }
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Field
                component={TextField}
                id="height"
                label="Height (Mt)"
                name="height"
                fullWidth
                type="number"
                step="any"
                InputProps={
                  { onChange: (e) => onFieldChange(e, stepProps.setFieldValue, stepProps.values) }
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Field
                component={TextField}
                id="imc"
                label="IMC (kg/mt2)"
                name="imc"
                fullWidth
                type="number"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Field
                component={TextField}
                id="heart_rate"
                label="Heart Rate"
                name="heart_rate"
                fullWidth
                type="number"
                step="any"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Field
                component={TextField}
                id="blood_pressure"
                label="Blood Pressure"
                name="blood_pressure"
                fullWidth
                type="number"
                step="any"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Field
                component={TextField}
                id="breath_frequency"
                label="Breath Frequency"
                name="breath_frequency"
                fullWidth
                type="number"
                step="any"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Field
                component={TextField}
                id="temperature"
                label="Temperature (°C)"
                name="temperature"
                fullWidth
                type="number"
                step="any"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Field
                component={TextField}
                id="cause"
                label="External Cause"
                name="cause"
                fullWidth
              />
            </Grid>
          </Grid>
        )}
      </FormikStep>
      <FormikStep label="History Information">
        {(stepProps) => (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <DynamicSelectField
                multiple
                field="code_id"
                reduxField="codes"
                label="CIE-10 Code"
                fetchFunc={getCodes}
                optionField="label"
                touched={stepProps.touched}
                errors={stepProps.errors}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="medical_evolution"
                variant="outlined"
                label="Medical Evolution"
                name="medical_evolution"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="background"
                variant="outlined"
                label="Background"
                name="background"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="medicine"
                variant="outlined"
                label="Medicine"
                name="medicine"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="exam_performed"
                variant="outlined"
                label="Exam Performed"
                name="exam_performed"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="reason"
                variant="outlined"
                label="Reason"
                name="reason"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="physical_exam"
                variant="outlined"
                label="Physical Exam"
                name="physical_exam"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="treatment_plan"
                variant="outlined"
                label="Treatment Plan"
                name="treatment_plan"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="medical_formula"
                variant="outlined"
                label="Medical Formula"
                name="treatmemedical_formulant_plan"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="note"
                variant="outlined"
                label="Note"
                name="note"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="consent"
                variant="outlined"
                label="Consent"
                name="consent"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="current_illness"
                variant="outlined"
                label="Current Illness"
                name="current_illness"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="current_treatment"
                variant="outlined"
                label="Current Treatment"
                name="current_treatment"
                fullWidth
                multiline
                rows="4"
              />
            </Grid>
          </Grid>
        )}
      </FormikStep>
    </FormikStepper>
  );
};

export default CreateForm;

CreateForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/require-default-props
  toggleForm: PropTypes.func,
};
