/* eslint-disable react/no-array-index-key */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { get, capitalize } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Typography, Divider, List, ListItem, ListItemText, ListItemIcon, Chip,
} from "@material-ui/core";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import SubtitlesOutlinedIcon from "@material-ui/icons/SubtitlesOutlined";
import ContactMailOutlinedIcon from "@material-ui/icons/ContactMailOutlined";
import LocationCityOutlinedIcon from "@material-ui/icons/LocationCityOutlined";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
  },
  header: {
    display: "flex",
    alignItems: "center",
    minHeight: 50,
    padding: "0 16px",
    lineHeight: "1.84615",
  },
  title: {
    fontSize: 14,
  },
  chip: {
    marginRight: 5,
  },
}));

const Details = memo(({ user }) => {
  const classes = useStyles();
  const generateList = () => {
    const list = [];
    if (get(user, "username")) {
      list.push({
        icon: AccountBoxOutlinedIcon,
        text: capitalize(get(user, "username")),
      });
    }
    if (get(user, "phone_number")) {
      list.push({
        icon: PhoneOutlinedIcon,
        text: get(user, "phone_number"),
      });
    }
    if (get(user, "address")) {
      list.push({
        icon: ContactMailOutlinedIcon,
        text: capitalize(get(user, "address")),
      });
    }
    if (get(user, "city")) {
      list.push({
        icon: LocationCityOutlinedIcon,
        text: capitalize(get(user, "city")),
      });
    }
    if (get(user, "roles")) {
      list.push({
        icon: SubtitlesOutlinedIcon,
        content: get(user, "roles"),
        component: "chip",
      });
    }
    return list;
  };

  const renderSubComponent = (component, content, index) => {
    switch (component) {
      case "chip":
        return <Chip key={index} size="small" label={capitalize(content.name)} className={classes.chip} />;
      default:
        return <Chip key={index} size="small" label={capitalize(content.name)} className={classes.chip} />;
    }
  };

  return (
    <Paper className={classes.root} square>
      <div className={classes.header}>
        <Typography variant="h5" component="h2" className={classes.title} color="textPrimary">
          Details
        </Typography>
      </div>
      <Divider />
      <List>
        {generateList().map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            {item.text
              ? (
                <ListItemText
                  key={index}
                  primary={(
                    <Typography variant="subtitle1" component="span" className={classes.title}>
                      {item.text}
                    </Typography>
                  )}
                />
              )
              : (
                <ListItemText
                  key={index}
                  primary={item.content.map((item2, index2) => renderSubComponent(
                    item.component, item2, index2,
                  ))}
                />
              )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
});

export default Details;

Details.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
};