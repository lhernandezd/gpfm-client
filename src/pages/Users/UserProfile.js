/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Typography, Avatar,
} from "@material-ui/core";
import Details from "../../components/users/Details";
import { getUser } from "../../actions/users";

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    display: "flex",
    padding: "20px 40px",
    backgroundColor: theme.palette.primary.main,
    marginBottom: 20,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: 30,
    border: "1.5px solid white",
  },
  basicInfo: {
    marginLeft: 60,
    display: "flex",
    flexDirection: "column",
    color: theme.palette.common.white,
  },
}));

const UserProfile = memo(({ match }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.user);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getUser(get(match, "params.id")));
  }, [dispatch]);

  return (
    <>
      <Paper className={classes.paperContainer} square>
        <Avatar className={classes.avatar}>LH</Avatar>
        <div className={classes.basicInfo}>
          <Typography variant="h5" component="h2">
            Luis Hernandez
          </Typography>
          <Typography variant="subtitle1" component="p">
            ldhdv95@gmail.com
          </Typography>
        </div>
      </Paper>
      {!Array.isArray(userData) && <Details user={userData} />}
    </>
  );
});

export default UserProfile;

UserProfile.propTypes = {
  match: PropTypes.object.isRequired,
};
