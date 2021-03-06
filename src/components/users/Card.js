import React, { memo } from "react";
import PropTypes from "prop-types";
import { startCase, capitalize, get } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Typography, CardActionArea, Avatar, Chip,
} from "@material-ui/core";
import AvatarBadge from "../shared/AvatarBadge";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  roleContainer: {
    display: "block",
    margin: "15px 10px",
    [theme.breakpoints.up("sm")]: {
      margin: "15px 20px",
    },
  },
  role: {
    marginRight: 5,
  },
}));

const Card = memo(({ user, onClickCard }) => {
  const classes = useStyles();
  const firtsName = get(user, "first_name", "");
  const lastName = get(user, "last_name", "");
  const status = get(user, "status", "");
  const roles = get(user, "roles", []);
  return (
    <Paper className={classes.root} square key={user.iid}>
      <CardActionArea onClick={() => onClickCard(user.id, user)}>
        <div className={classes.content}>
          <AvatarBadge status={status}>
            <Avatar className={classes.avatar}>{`${firtsName[0]}${lastName[0]}`}</Avatar>
          </AvatarBadge>
          <Typography variant="h5" component="h2" className={classes.title} color="textPrimary" noWrap>
            {startCase(`${firtsName} ${lastName}`)}
          </Typography>
          <span className={classes.roleContainer}>
            {roles.map((role) => (
              <Chip className={classes.role} key={role.id} label={capitalize(role.name)} size="small" />
            ))}
          </span>
        </div>
      </CardActionArea>
    </Paper>
  );
});

export default Card;

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  onClickCard: PropTypes.func.isRequired,
};
