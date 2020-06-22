import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { get, capitalize } from "lodash";
import {
  AppBar, Drawer, Hidden, IconButton,
  Toolbar, Typography, Menu, MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppDrawer from "./AppDrawer";
import { logout } from "../actions/authentication";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
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
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  layout: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 240px)",
    },
  },
}));

const renderMenu = (anchorEl, isMenuOpen, handleMenuClose, handleLogout) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id="app-menu"
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  </Menu>
);

export default function AppLayout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const container = window !== undefined ? () => window.document.body : undefined;
  const pathname = get(history, "location.pathname");
  const navigationTitle = pathname ? pathname.split("/")[1] : "Home";
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
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
          {renderMenu(anchorEl, isMenuOpen, handleMenuClose, handleLogout)}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="navigation container">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <AppDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <AppDrawer history={history} />
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.layout}>
        {children}
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
