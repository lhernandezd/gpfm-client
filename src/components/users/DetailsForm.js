import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { get, capitalize, difference } from "lodash";
import {
  Button,
  LinearProgress,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField, Select } from "formik-material-ui";
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
    roles: roles.length ? rolesByName : [],
  };

  const handleSubmit = async (values) => {
    const valuesUpdated = { ...values };
    const rolesDiff = difference(rolesByName, values.roles);
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
      {({ submitForm, isSubmitting }) => (
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
              variant="outlined"
              margin="normal"
              fullWidth
              style={{ marginTop: 0 }}
            />
            <Field
              component={TextField}
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              variant="outlined"
              margin="normal"
              fullWidth
              style={{ marginTop: 0 }}
            />
            <Field
              component={TextField}
              id="address"
              label="Address"
              name="address"
              variant="outlined"
              margin="normal"
              fullWidth
              style={{ marginTop: 0 }}
            />
            <Field
              component={Select}
              variant="outlined"
              name="roles"
              multiple
              fullWidth
            >
              {DefaultRoles.map((role) => (
                <MenuItem
                  key={role.id}
                  value={role.name}
                >
                  {capitalize(role.name)}
                </MenuItem>
              ))}
            </Field>
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
