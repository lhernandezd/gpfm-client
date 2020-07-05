import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get, capitalize } from "lodash";
import {
  AppBar, IconButton, Toolbar, Typography,
  Popover, ClickAwayListener, Divider, ListItemIcon,
  List, ListItem, ListItemAvatar, Avatar, ListItemText,
  Chip, InputBase,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles, fade } from "@material-ui/core/styles";
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
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
    display: "block",
    marginTop: 8,
  },
  role: {
    marginRight: 5,
  },
}));

const renderList = (classes, user, handleLogout, profileRedirect) => (
  <List className={classes.list} id="app-menu">
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.avatar}>A</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={capitalize(get(user, "username"))}
        secondary={(
          <>
            {get(user, "email")}
            <br />
            <span className={classes.roleContainer}>
              {user && user.roles.map((role, index) => (
              // eslint-disable-next-line react/no-array-index-key
                <Chip className={classes.role} key={index} label={capitalize(role)} size="small" />
              ))}
            </span>
          </>
          )}
      />
    </ListItem>
    <Divider component="li" />
    <ListItem button onClick={profileRedirect}>
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

const renderMenu = (
  anchorEl, isMenuOpen, handleMenuClose,
  handleLogout, classes, user, profileRedirect,
) => (
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
      {renderList(classes, user, handleLogout, profileRedirect)}
    </ClickAwayListener>
  </Popover>
);

export default function AppNavbar({ handleDrawerToggle }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.currentUser);

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const profileRedirect = useCallback(() => {
    handleMenuClose();
    const firstName = get(user, "first_name");
    const lastName = get(user, "last_name");
    const id = get(user, "id");
    history.push(`/users/${id}`, {
      directionName: `${firstName}_${lastName}`,
      user_id: id,
    });
  }, [history, user]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
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
          {capitalize("")}
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
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
        {renderMenu(anchorEl, isMenuOpen,
          handleMenuClose, handleLogout, classes, user, profileRedirect)}
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};
