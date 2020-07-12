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

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  progress: {
    borderRadius: "2px 2px 0 0",
  },
  progressSkeleton: {
    height: 4,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: "8px 16px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    "& button:last-child": {
      marginLeft: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  username: "",
  phone_number: "",
  address: "",
  roles: [],
  test: [],
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
    const rolesArray = values.roles.map((roles) => roles.name);
    const valuesUpdated = { ...values, roles: rolesArray };
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
              <Grid item xs sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="username"
                  label="Username"
                  name="username"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
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
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="address"
                  label="Address"
                  name="address"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="roles"
                  multiple
                  component={Autocomplete}
                  options={DefaultRoles}
                  getOptionLabel={(option) => capitalize(option.name)}
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
