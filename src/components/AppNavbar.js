import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { get, capitalize } from "lodash";
import {
  AppBar, IconButton, Toolbar, Typography,
  Popover, ClickAwayListener, Divider, ListItemIcon,
  List, ListItem, ListItemAvatar, Avatar, ListItemText,
  Chip,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../actions/authentication";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#ffff",
    color: "rgba(0, 0, 0, 0.87)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    display: "block",
    flexGrow: 1,
    textAlign: "initial",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  titleSkeleton: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      flexGrow: 1,
      textAlign: "initial",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  list: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  roleContainer: {
    marginTop: 8,
  },
  role: {
    marginRight: 5,
  },
}));

const renderList = (classes, user, handleLogout) => (
  <List className={classes.list} id="app-menu">
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.avatar}>A</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={capitalize(user ? user.username : "")}
        secondary={(
          <>
            {user ? user.email : ""}
            <br />
            <div className={classes.roleContainer} style={{ marginTop: 8 }}>
              {user && user.roles.map((role, index) => (
              // eslint-disable-next-line react/no-array-index-key
                <Chip className={classes.role} key={index} label={capitalize(role)} size="small" />
              ))}
            </div>
          </>
          )}
      />
    </ListItem>
    <Divider component="li" />
    <ListItem button>
      <ListItemIcon><FaceIcon /></ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography variant="body2" gutterBottom>Go to Profile</Typography>}
      />
    </ListItem>
    <ListItem button onClick={handleLogout}>
      <ListItemIcon><ExitToAppIcon /></ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography variant="body2" gutterBottom>Sign Out</Typography>}
      />
    </ListItem>
  </List>
);

const renderMenu = (anchorEl, isMenuOpen, handleMenuClose, handleLogout, classes, user) => (
  <Popover
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={isMenuOpen}
  >
    <ClickAwayListener onClickAway={handleMenuClose}>
      {renderList(classes, user, handleLogout)}
    </ClickAwayListener>
  </Popover>
);

export default function AppNavbar({ handleDrawerToggle, history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.currentUser);

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const pathname = get(history, "location.pathname");
  const navigationTitle = pathname ? pathname.split("/")[1] : "Home";
  return (
    <AppBar position="fixed" className={classes.appBar} elevation={3}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.titleSkeleton} />
        <Typography className={classes.title} variant="h6" noWrap>
          {capitalize(navigationTitle)}
        </Typography>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="app-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {renderMenu(anchorEl, isMenuOpen, handleMenuClose, handleLogout, classes, user)}
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
