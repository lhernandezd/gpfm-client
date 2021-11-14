/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import SummaryCard from "../../components/shared/SummaryCard";

export default function HomeList({ match }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <SummaryCard />
      </Grid>
      <Grid item xs>
        <SummaryCard />
      </Grid>
      <Grid item xs>
        <SummaryCard />
      </Grid>
    </Grid>
  );
}

HomeList.propTypes = {
  match: PropTypes.object.isRequired,
};
