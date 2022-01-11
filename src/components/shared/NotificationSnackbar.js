import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { clearSnackbar } from "../../actions/snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  children: {
    minWidth: "20vw",
  },
  snackbarOrigin: {
    [theme.breakpoints.up("sm")]: {
      left: "calc(50% + 100px)",
    },
  },
  snackbarOriginLogin: {
    [theme.breakpoints.up("sm")]: {
      left: "50%",
    },
  },
}));

const Alert = (props) => <MuiAlert elevation={6} {...props} />;

const NotificationSnackbar = ({ isAuthenticated }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { message, open, severity } = useSelector(
    (state) => state.snackbar,
  );

  const handleClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      classes={{
        anchorOriginTopCenter: isAuthenticated
          ? classes.snackbarOrigin
          : classes.snackbarOriginLogin,
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
      className={classes.root}
    >
      <Alert onClose={handleClose} severity={severity} className={classes.children}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationSnackbar;

NotificationSnackbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
