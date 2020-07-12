/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { get, startCase } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Typography, Avatar, CircularProgress, Fade,
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
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

const UserProfile = memo(({ match }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const classes = useStyles();
  const firstName = get(users, "user.first_name", "");
  const lastName = get(users, "user.last_name", "");
  const fullName = `${firstName} ${lastName}`;
  const email = get(users, "user.email", "");

  useEffect(() => {
    dispatch(getUser(get(match, "params.id")));
  }, [dispatch]);

  return (
    <>
      {users.isFetching
        ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )
        : (
          <Fade in={!users.isFetching}>
            <div>
              <Paper className={classes.paperContainer} square>
                <Avatar className={classes.avatar}>LH</Avatar>
                <div className={classes.basicInfo}>
                  <Typography variant="h5" component="h2">
                    {`${startCase(fullName)}`}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    {email}
                  </Typography>
                </div>
              </Paper>
              {!Array.isArray(users.user) && <Details user={users.user} />}
            </div>
          </Fade>
        )}
    </>
  );
});

export default UserProfile;

UserProfile.propTypes = {
  match: PropTypes.object.isRequired,
};
