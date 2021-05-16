/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { get, difference } from "lodash";
import {
  Grid,
} from "@material-ui/core";
import { Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { updateHistory } from "../../actions/histories";
import parseSelectOptions from "../../utils/parseSelectOptions";
import parseFormValues from "../../utils/parseFormValues";
import DynamicSelectField from "../form/DynamicSelectField";
import { getPatients } from "../../actions/patients";
import { getCodes } from "../../actions/codes";
import { FormikStepper, FormikStep } from "../form/FormikStepForm";

const HistorySchema = Yup.object().shape({
  weight: Yup.number().required("Required"),
  height: Yup.number().required("Required"),
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

const UpdateForm = ({ history, toggleForm }) => {
  const dispatch = useDispatch();

  const patient = get(history, "patient", {});
  const cieCodes = get(history, "codes", []);

  const initialValues = {
    patient_id: parseSelectOptions({ data: [patient] }, "patients")[0],
    weight: get(history, "weight"),
    height: get(history, "height"),
    imc: get(history, "imc"),
    heart_rate: get(history, "heart_rate"),
    blood_pressure: get(history, "blood_pressure"),
    breath_frequency: get(history, "breath_frequency"),
    temperature: get(history, "temperature"),
    cause: get(history, "cause"),
    code_id: parseSelectOptions({ data: cieCodes }, "codes"),
    medical_evolution: get(history, "medical_evolution"),
    background: get(history, "background"),
    medicine: get(history, "medicine"),
    exam_performed: get(history, "exam_performed"),
    reason: get(history, "reason"),
    physical_exam: get(history, "physical_exam"),
    treatment_plan: get(history, "treatment_plan"),
    medical_formula: get(history, "medical_formula"),
    note: get(history, "note"),
    consent: get(history, "consent"),
    current_illness: get(history, "current_illness"),
    current_treatment: get(history, "current_treatment"),
  };

  const handleSubmit = async (values) => {
    const baseCodesArray = cieCodes.map((code) => code.id);
    const valuesUpdated = parseFormValues(values);
    const codesArray = valuesUpdated.code_id;
    const codesDiff = difference(baseCodesArray, codesArray);
    if (codesDiff.length) valuesUpdated.remove_codes = codesDiff;
    await dispatch(updateHistory(history.id, valuesUpdated));
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
      validationSchema={HistorySchema}
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
                required
                disabled
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
                required
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
                required
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
                name="medical_formula"
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

export default UpdateForm;

UpdateForm.propTypes = {
  history: PropTypes.object.isRequired,
  toggleForm: PropTypes.func.isRequired,
};
