import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  List, ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";
import { navigationLinks } from "../utils/staticDataTypes";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default function AppDrawer() {
  const classes = useStyles();
  const history = useHistory();

  const handleLink = (href) => {
    history.push(href);
  };

  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navigationLinks.map(({ text, href, IconComponent }) => (
          <ListItem
            button
            key={text}
            selected={history.location.pathname === href}
            onClick={() => handleLink(href)}
          >
            <ListItemIcon><IconComponent /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
