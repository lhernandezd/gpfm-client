/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { get } from "lodash";
import { resetPassword } from "../../actions/authentication";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  password: "",
  passwordConfirm: "",
};

const ResetSchema = Yup.object().shape({
  password: Yup.string().required("Password is Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required("Password confirm is required"),
});

const ResetForm = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const token = get(match, "params.token");
    const password = get(values, "password");
    await dispatch(resetPassword({
      password,
      token,
    }, history));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={ResetSchema}
    >
      {({ submitForm, isSubmitting }) => (
        <>
          {isSubmitting
            ? <LinearProgress className={classes.progress} />
            : <div className={classes.progressSkeleton} />}
          <div className={classes.formContainer}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Form className={classes.form}>
              <Field
                component={TextField}
                required
                id="password"
                label="New Password"
                name="password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Field
                component={TextField}
                required
                id="passwordConfirm"
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
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
                Update Password
              </Button>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default ResetForm;

ResetForm.propTypes = {
  match: PropTypes.object.isRequired,
};
