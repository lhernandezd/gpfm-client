import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { capitalize } from "lodash";
import {
  Button,
  LinearProgress,
  Grid,
} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import { createPatient, getPatients } from "../../actions/patients";
import {
  documentTypes as DefaultTypes,
  genders as DefaultGenders,
  civilStatus as DefaultStatus,
  bloodTypes as DefaultBloods,
} from "../../utils/staticDataTypes";
import { modalFormStyles } from "../../styles";
import parseFormValues from "../../utils/parseFormValues";
import DynamicSelectField from "../form/DynamicSelectField";
import { getCities } from "../../actions/cities";

const useStyles = makeStyles((theme) => modalFormStyles(theme));

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  address: "",
  document: "",
  birth_date: null,
  neighborhood: "",
  occupation: "",
};

const DetailSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email(),
  phone_number: Yup.number(),
  address: Yup.string(),
  document_type: Yup.object(),
  document: Yup.string(),
  birth_date: Yup.date(),
  gender: Yup.object(),
  neighborhood: Yup.string(),
  occupation: Yup.string(),
  civil_status: Yup.object(),
  blood_type: Yup.object(),
});

const CreateForm = ({ toggleForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const valuesUpdated = parseFormValues(values);
    await dispatch(createPatient(valuesUpdated));
    await dispatch(getPatients());
    toggleForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={DetailSchema}
    >
      {({
        submitForm, isSubmitting, touched, errors,
      }) => (
        <>
          {isSubmitting
            ? <LinearProgress className={classes.progress} />
            : <div className={classes.progressSkeleton} />}
          <Form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="document_type"
                  component={Autocomplete}
                  options={DefaultTypes}
                  getOptionLabel={(option) => capitalize(option.name)}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField
                      {...params}
                      error={touched.document_type && !!errors.document_type}
                      helperText={touched.document_type && errors.document_type}
                      label="Document Type"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  id="document"
                  label="Document Number"
                  name="document"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <DynamicSelectField
                  field="city_id"
                  reduxField="cities"
                  label="City"
                  fetchFunc={getCities}
                  optionField="label"
                  touched={touched}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="address"
                  label="Address"
                  name="address"
                  fullWidth
                />
              </Grid>
              <Grid item xs sm={12} md={6}>
                <Field
                  component={KeyboardDatePicker}
                  id="birth_date"
                  name="birth_date"
                  label="Birth Date"
                  variant="inline"
                  format="dd/MM/yyyy"
                  fullWidth
                />
              </Grid>
              <Grid item xs sm={12} md={6}>
                <Field
                  name="gender"
                  component={Autocomplete}
                  options={DefaultGenders}
                  getOptionLabel={(option) => capitalize(option.name)}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField
                      {...params}
                      error={touched.gender && !!errors.gender}
                      helperText={touched.gender && errors.gender}
                      label="Gender"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="email"
                  label="Email Address"
                  name="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  id="neighborhood"
                  label="Neighborhood"
                  name="neighborhood"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  id="occupation"
                  label="Occupation"
                  name="occupation"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="civil_status"
                  component={Autocomplete}
                  options={DefaultStatus}
                  getOptionLabel={(option) => capitalize(option.name)}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField
                      {...params}
                      error={touched.civil_status && !!errors.civil_status}
                      helperText={touched.civil_status && errors.civil_status}
                      label="Civil Status"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="blood_type"
                  component={Autocomplete}
                  options={DefaultBloods}
                  getOptionLabel={(option) => capitalize(option.name)}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField
                      {...params}
                      error={touched.blood_type && !!errors.blood_type}
                      helperText={touched.blood_type && errors.blood_type}
                      label="Blood Type"
                    />
                  )}
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
                  disabled={isSubmitting}
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

export default CreateForm;

CreateForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/require-default-props
  toggleForm: PropTypes.func,
};
