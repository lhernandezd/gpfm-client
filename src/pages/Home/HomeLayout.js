import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SummaryCard from "../../components/SummaryCard";

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
}));

export default function LoginLayout() {
  const classes = useStyles();

  return (
    <section className={classes.container}>
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
    </section>
  );
}
