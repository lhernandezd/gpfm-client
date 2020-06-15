import React from "react";
import {
  Avatar,
  Typography,
  Button,
  Link,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "../../atoms/index";
import { userPostMehtod } from "../../selectors/index";

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
    backgroundColor: theme.palette.secondary.main,
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
  remember: true,
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
});

export default function LoginForm() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);
  const setuserPostMehtod = useSetRecoilState(userPostMehtod);
  // const {
  //   get, post, response, loading, error,
  // } = useFetch("http://localhost:3001/api");

  const handleSubmit = async (values) => {
    // setUser({ ...user, loading: true });
    console.log(JSON.stringify(values));
    await setuserPostMehtod(values);
    history.push("/");
    // const userData = await post("/auth/signin", values);
    // if (response.ok) {
    //   setUser({
    //     ...user,
    //     data: userData,
    //     loading: false,
    //     error: "",
    //   });
    // } else {
    //   setUser({
    //     ...user,
    //     data: [],
    //     loading: false,
    //     error,
    //   });
    // }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
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
              <Field
                component={CheckboxWithLabel}
                name="remember"
                color="primary"
                Label={{ label: "Remember me" }}
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
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </Formik>
  );
}
