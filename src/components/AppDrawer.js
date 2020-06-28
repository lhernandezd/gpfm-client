import React, { memo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  List, ListItem, ListItemIcon, ListItemText, Typography,
} from "@material-ui/core";
import { navigationLinks } from "../utils/staticDataTypes";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    borderLeft: "2px solid #00897b",
  },
  icon: {
    color: "rgba(250, 250, 250, 0.54)",
    fontSize: "1.4rem",
    minWidth: 40,
  },
}));

const AppDrawer = memo(({ handleDrawerToggle }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLink = (href) => {
    if (handleDrawerToggle) handleDrawerToggle();
    history.push(href);
  };

  return (
    <>
      <div className={classes.toolbar}>
        <Typography variant="body1" component="h1" noWrap>
          Material-UI
        </Typography>
      </div>
      <Divider />
      <List>
        {navigationLinks.map(({ text, href, IconComponent }) => (
          <ListItem
            button
            key={text}
            selected={history.location.pathname === href}
            onClick={() => handleLink(href)}
            className={history.location.pathname === href ? classes.listItem : ""}
          >
            <ListItemIcon><IconComponent className={classes.icon} /></ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="body2" gutterBottom>{text}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
});

export default AppDrawer;

AppDrawer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  handleDrawerToggle: PropTypes.func,
};
