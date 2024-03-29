/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: "\"\"",
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  active: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.main,
  },
  inactive: {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.main,
  },
}));

const BadgeAvatars = ({ children, status, invisible }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
        classes={{
          badge: status === "active" ? classes.active : classes.inactive,
        }}
        invisible={invisible}
      >
        {children}
      </StyledBadge>
    </div>
  );
}

export default BadgeAvatars;

BadgeAvatars.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string,
  invisible: PropTypes.bool,
};

BadgeAvatars.defaultProps = {
  status: "inactive",
};
