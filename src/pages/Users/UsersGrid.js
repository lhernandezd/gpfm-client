/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { getUsers } from "../../actions/users";
import Card from "../../components/users/Card";

export default function UsersGrid({ location, history }) {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const onUserClick = (id, user) => {
    const firstName = get(user, "first_name");
    const lastName = get(user, "last_name");
    history.push(`${location.pathname}/${id}?directionName=${`${firstName}_${lastName}`}`);
  };

  return (
    <Grid container spacing={3}>
      {usersData.map((user) => (
        <Grid item xs sm={2} md={4} key={user.id}>
          <Card user={user} onClickCard={onUserClick} />
        </Grid>
      ))}
    </Grid>
  );
}

UsersGrid.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
