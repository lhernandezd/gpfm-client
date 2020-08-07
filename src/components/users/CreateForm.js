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
import { createUser, getUsers } from "../../actions/users";
import { roles as DefaultRoles } from "../../utils/staticDataTypes";
import { modalFormStyles } from "../../styles";
import parseFormValues from "../../utils/parseFormValues";
import DynamicSelectField from "../form/DynamicSelectField";
import { getCities } from "../../actions/cities";

const useStyles = makeStyles((theme) => modalFormStyles(theme));

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  username: "",
  phone_number: "",
  address: "",
  roles: [],
  city_id: null,
};

const DetailSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().length(6, "Minimum password length: 6").required("Required"),
  username: Yup.string(),
  phone_number: Yup.number(),
  address: Yup.string(),
  roles: Yup.array().min(1).required("Required"),
});

const CreateForm = ({ toggleForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const valuesUpdated = parseFormValues(values);
    await dispatch(createUser(valuesUpdated));
    await dispatch(getUsers());
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
                  component={TextField}
                  required
                  id="username"
                  label="Username"
                  name="username"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  fullWidth
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
                  id="address"
                  label="Address"
                  name="address"
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
                  name="roles"
                  multiple
                  component={Autocomplete}
                  options={DefaultRoles}
                  getOptionLabel={(option) => capitalize(option.name)}
                  getOptionSelected={(option, rest) => option.name === rest.name}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField
                      {...params}
                      error={touched.roles && !!errors.roles}
                      helperText={touched.roles && errors.roles}
                      label="Roles"
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
