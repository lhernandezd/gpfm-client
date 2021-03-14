import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  LinearProgress,
  Grid,
} from "@material-ui/core";
import {
  Form, Formik, FormikConfig, FormikValues,
} from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { modalFormStyles } from "../../styles";

const useStyles = makeStyles((theme) => modalFormStyles(theme));

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const classes = useStyles();
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const isLastStep = () => step === childrenArray.length - 1;
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting, dirty, ...formikProps }) => (
        <>
          {isSubmitting
            ? <LinearProgress className={classes.progress} />
            : <div className={classes.progressSkeleton} />}
          <Form className={classes.form}>
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child) => (
                <Step key={child.props.label}>
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {React.cloneElement(currentChild, { ...formikProps })}
            <Grid item xs={12} className={classes.actions}>
              <Button
                color="primary"
                className={classes.button}
                onClick={props.toggleAction}
              >
                Close
              </Button>
              {step > 0
                && (
                <Button
                  disabled={isSubmitting}
                  color="primary"
                  className={classes.button}
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
                )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={isSubmitting || (isLastStep() && !dirty)}
                startIcon={isSubmitting ? <CircularProgress /> : null}
              >
                {isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
}

export function FormikStep({ children, ...props }) {
  return (
    <>
      {children(props)}
    </>
  );
}

FormikStep.propTypes = {
  children: PropTypes.node.isRequired,
};
