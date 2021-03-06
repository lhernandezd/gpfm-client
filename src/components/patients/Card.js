import React, { memo } from "react";
import PropTypes from "prop-types";
import { startCase, get, capitalize } from "lodash";
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
  chipContainer: {
    display: "block",
    margin: "15px 10px",
    [theme.breakpoints.up("sm")]: {
      margin: "15px 20px",
    },
  },
  chip: {
    marginRight: 5,
  },
}));

const Card = memo(({ patient, onClickCard }) => {
  const classes = useStyles();
  const firtsName = get(patient, "first_name", "");
  const lastName = get(patient, "last_name", "");
  const documentType = get(patient, "document_type", "");
  const document = get(patient, "document", "");
  return (
    <Paper className={classes.root} square key={patient.iid}>
      <CardActionArea onClick={() => onClickCard(patient.id, patient)}>
        <div className={classes.content}>
          <AvatarBadge status="active">
            <Avatar className={classes.avatar}>{`${firtsName[0]}${lastName[0]}`}</Avatar>
          </AvatarBadge>
          <Typography variant="h5" component="h2" className={classes.title} color="textPrimary" noWrap>
            {startCase(`${firtsName} ${lastName}`)}
          </Typography>
          <span className={classes.chipContainer}>
            <Chip className={classes.chip} label={capitalize(documentType)} size="small" />
            <Chip className={classes.chip} label={capitalize(document)} size="small" />
          </span>
        </div>
      </CardActionArea>
    </Paper>
  );
});

export default Card;

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  patient: PropTypes.object.isRequired,
  onClickCard: PropTypes.func.isRequired,
};
