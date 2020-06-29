import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper, Typography, Divider,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

const useStyles = makeStyles((theme) => ({
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
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
  },
  quantity: {
    fontSize: 20,
    margin: "20px 0",
  },
  statusContainer: {
    display: "flex",
    padding: "16px 12px 0",
    width: "100%",
    justifyContent: "space-evenly",
  },
  status: {
    display: "flex",
    flexDirection: "column",
    padding: "0 4px",
    alignItems: "center",
  },
  statusPrimary: {
    display: "flex",
    alignItems: "center",
  },
  statusIcon: {
    color: theme.palette.primary.main,
    marginRight: 5,
  },
}));

export default function SummaryCard() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} square>
      <div className={classes.header}>
        <Typography variant="h5" component="h2" className={classes.title} color="textPrimary">
          Summary Users
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <p className={classes.quantity}>
          25
        </p>
        <div className={classes.statusContainer}>
          <div className={classes.status}>
            <div className={classes.statusPrimary}>
              <CheckBoxIcon className={classes.statusIcon} />
              <Typography variant="body1" component="span" color="textPrimary">
                8
              </Typography>
            </div>
            <Typography variant="caption" component="span" color="textSecondary">
              Active
            </Typography>
          </div>
          <div className={classes.status}>
            <div className={classes.statusPrimary}>
              <NotInterestedIcon className={classes.statusIcon} />
              <Typography variant="body1" component="span" color="textPrimary">
                10
              </Typography>
            </div>
            <Typography variant="caption" component="span" color="textSecondary">
              Inactive
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
}
