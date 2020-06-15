import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';
import Copyright from '../../components/Copyright';

const useStyles = makeStyles((theme) => ({
  layout: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export default function LoginLayout() {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Paper elevation={3}>
          <LoginForm />
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
