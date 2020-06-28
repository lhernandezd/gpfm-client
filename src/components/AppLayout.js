import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Drawer, Hidden } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppNavbar from "./AppNavbar";
import AppDrawer from "./AppDrawer";

const drawerWidth = 200;

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
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#212223",
    color: "#ffff",
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
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
}));

export default function AppLayout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window.document.body : undefined;
  return (
    <div className={classes.root}>
      <AppNavbar handleDrawerToggle={handleDrawerToggle} history={history} />
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
            <AppDrawer handleDrawerToggle={handleDrawerToggle} />
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
