import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { get, capitalize, difference } from "lodash";
import {
  Button,
  LinearProgress,
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
import { updateUser, getUser } from "../../actions/users";
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const DetailSchema = Yup.object().shape({
  phone_number: Yup.number(),
});

const DetailsForm = ({ user, toggleForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const roles = get(user, "roles", []);
  const rolesByName = roles.map((role) => role.name);
  const initialValues = {
    username: get(user, "username", ""),
    phone_number: get(user, "phone_number", ""),
    address: get(user, "address", ""),
    roles: roles.length ? roles.map((role) => ({ name: role.name })) : [],
  };

  const handleSubmit = async (values) => {
    const rolesArray = values.roles.map((rolesForm) => rolesForm.name);
    const valuesUpdated = { ...values, roles: rolesArray };
    const rolesDiff = difference(rolesByName, rolesArray);
    if (rolesDiff.length) valuesUpdated.remove_roles = rolesDiff;
    await dispatch(updateUser(user.id, valuesUpdated));
    await dispatch(getUser(user.id));
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
            <Field
              component={TextField}
              id="username"
              label="Username"
              name="username"
              margin="normal"
              fullWidth
            />
            <Field
              component={TextField}
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              margin="normal"
              fullWidth
            />
            <Field
              component={TextField}
              id="address"
              label="Address"
              name="address"
              margin="normal"
              fullWidth
            />
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
              onClick={submitForm}
              size="large"
              fullWidth
            >
              Submit
            </Button>
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
