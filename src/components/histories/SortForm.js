/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  LinearProgress,
  Grid,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import DynamicSelectField from "../form/DynamicSelectField";
import { getHistories } from "../../actions/histories";
import { getPatients } from "../../actions/patients";
import { modalFormStyles } from "../../styles";
import parseFormValues from "../../utils/parseFormValues";

const useStyles = makeStyles((theme) => modalFormStyles(theme));

const SortSchema = Yup.object().shape({
  patient_id: Yup.object({
    id: Yup.string().required("Required"),
    label: Yup.string(),
  }).nullable(true),
});

const SortForm = ({ toggleForm, customFunctionForForm, customPropsForForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = customPropsForForm.options;

  const handleSubmit = async (values) => {
    const valuesUpdated = parseFormValues(values);
    const searchObj = {
      ...customPropsForForm.options,
      patient_id: valuesUpdated.patient_id,
    };
    await dispatch(getHistories({
      search: searchObj,
    }));
    customFunctionForForm(values);
    toggleForm();
  };

  const handlingPatientsDynamicField = (value) => {
    const [firstName, lastName] = value.split(" ");
    const searchObj = {};
    if (firstName) searchObj.first_name = { value: firstName, operator: "search" };
    if (lastName) searchObj.last_name = { value: lastName, operator: "search" };
    return {
      searchObj,
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={SortSchema}
    >
      {({
        submitForm, isSubmitting, dirty, errors, touched,
      }) => (
        <>
          {isSubmitting
            ? <LinearProgress className={classes.progress} />
            : <div className={classes.progressSkeleton} />}
          <Form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <DynamicSelectField
                  field="patient_id"
                  reduxField="patients"
                  label="Patient"
                  fetchFunc={getPatients}
                  optionField="label"
                  touched={touched}
                  errors={errors}
                  fetchOnKeyInput
                  searchOnInputField="first_name"
                  customDynamicFieldHandling={handlingPatientsDynamicField}
                />
              </Grid>
              <Grid item xs={12} className={classes.actions}>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={toggleForm}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting || !dirty}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default SortForm;

SortForm.propTypes = {
  toggleForm: PropTypes.func,
  customPropsForForm: PropTypes.object,
  customFunctionForForm: PropTypes.func,
};
