import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { login } from "../../actions/authentication";

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
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
});

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (values, setSubmitting) => {
    setTimeout(() => {
      dispatch(login(values, history));
      setSubmitting(false);
    }, 1000);
  };

  const onLinkClick = () => {
    history.push("/recoverPassword");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
      validationSchema={LoginSchema}
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
              Sign in
            </Typography>
            <Form className={classes.form}>
              <Field
                component={TextField}
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Field
                component={TextField}
                required
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
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
                Sign In
              </Button>
            </Form>
            <Grid container>
              <Grid item xs>
                <Typography color="primary" component="a" variant="body2" onClick={onLinkClick}>
                  Forgot password?
                </Typography>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
