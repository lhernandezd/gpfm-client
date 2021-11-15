import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Typography,
  Button,
  LinearProgress,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { recoverAccount } from "../../actions/authentication";

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
    fontSize: 14,
  },
}));

const initialValues = {
  email: "",
};

const RecoverSchema = Yup.object().shape({
  email: Yup.string().email().required("Email Required"),
});

const RecoverForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(recoverAccount(values, history));
  };

  const onLinkClick = () => {
    history.push("/login");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={RecoverSchema}
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
              Recover your account
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
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.submit}
                    onClick={onLinkClick}
                    size="large"
                    fullWidth
                  >
                    Return to login
                  </Button>
                </Grid>
                <Grid item>
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
                    Send email
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default RecoverForm;
