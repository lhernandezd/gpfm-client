import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import FormikField from '../../components/FormikField';
import FormikCheckbox from '../../components/FormikCheckbox';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  email: '',
  password: '',
  test: true
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

export default function LoginForm() {
  const handleSubmit = (values) => {
    console.log(JSON.stringify(values));
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {props => (
          <Form className={classes.form}>
            <FormikField
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...props}
            />
            <FormikField
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              {...props}
            />
            <FormikCheckbox
              name="test"
              label="Remember me"
              color="primary"
              {...props}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
