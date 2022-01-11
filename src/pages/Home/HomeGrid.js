/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import SummaryCard from "../../components/shared/SummaryCard";

const HomeGrid = ({ location }) => (
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
    <Link to={`${location.pathname}/1`}>Home list</Link>
  </Grid>
);

export default HomeGrid;

HomeGrid.propTypes = {
  location: PropTypes.object.isRequired,
};
