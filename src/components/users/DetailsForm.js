import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { get, capitalize, difference } from "lodash";
import {
  Button,
  LinearProgress,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import { updateUser } from "../../actions/users";
import { roles as DefaultRoles } from "../../utils/staticDataTypes";
import DynamicSelectField from "../form/DynamicSelectField";
import { getCities } from "../../actions/cities";

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
  buttons: {
    margin: theme.spacing(3, 0, 2),
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    "& button:last-child": {
      marginLeft: theme.spacing(1),
    },
  },
}));

const UserSchema = Yup.object().shape({
  phone_number: Yup.number(),
});

const DetailsForm = ({ user, toggleForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const roles = get(user, "roles", []);
  const city = get(user, "city", {});
  const rolesByName = roles.map((role) => role.name);
  const initialValues = {
    username: get(user, "username", ""),
    phone_number: get(user, "phone_number", ""),
    address: get(user, "address", ""),
    roles: roles.length ? roles.map((role) => ({ name: role.name })) : [],
    city_id: {
      id: city.id,
      label: `${city.name}, ${city.state?.name}`,
    },
  };

  const handleSubmit = async (values) => {
    const rolesArray = values.roles.map((rolesForm) => rolesForm.name);
    const valuesUpdated = { ...values, roles: rolesArray };
    const rolesDiff = difference(rolesByName, rolesArray);
    if (rolesDiff.length) valuesUpdated.remove_roles = rolesDiff;
    await dispatch(updateUser(user.id, valuesUpdated));
    toggleForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={UserSchema}
    >
      {({
        submitForm, isSubmitting, touched, errors,
      }) => (
        <>
          {isSubmitting
            ? <LinearProgress className={classes.progress} />
            : <div className={classes.progressSkeleton} />}
          <Form className={classes.form}>
            <Grid container>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="username"
                  label="Username"
                  name="username"
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="address"
                  label="Address"
                  name="address"
                  margin="dense"
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
                      margin="dense"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} className={classes.actions}>
                <Button
                  color="primary"
                  className={classes.buttons}
                  onClick={toggleForm}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
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

export default DetailsForm;

DetailsForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  toggleForm: PropTypes.func.isRequired,
};
