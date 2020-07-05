/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getUsers } from "../../actions/users";
import Card from "../../components/users/Card";

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

export default function UsersGrid({ location, history }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const onUserClick = (id, user) => {
    const firstName = get(user, "first_name");
    const lastName = get(user, "last_name");
    history.push(`${location.pathname}/${id}`, {
      directionName: `${firstName}_${lastName}`,
      user_id: id,
    });
  };

  return (
    <>
      {users.isFetching
        ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )
        : (
          <Grid container spacing={3}>
            {users.data.map((user) => (
              <Grid item xs sm={2} md={4} key={user.id}>
                <Card user={user} onClickCard={onUserClick} />
              </Grid>
            ))}
          </Grid>
        )}
    </>
  );
}

UsersGrid.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
