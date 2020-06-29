/* eslint-disable react/forbid-prop-types */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DynamicDirection from "../../components/shared/DynamicDirection";
import { getUsers } from "../../actions/users";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

const UsersLayout = memo(({ location, history, match }) => {
  const classes = useStyles();
  const [routes, setRoutes] = useState([]);
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const arrangeRoutes = pathnames.map((item, index) => ({
      title: item,
      path: index === 0 ? match.path : `${match.path}/${item}`,
    }));
    setRoutes(arrangeRoutes);
  }, [location.pathname, match.path]);

  return (
    <section className={classes.container}>
      <DynamicDirection path={match.path} routes={routes} refresh />
      {usersData.data.map((user) => <p>{user.username}</p>)}
    </section>
  );
});

export default UsersLayout;

UsersLayout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
