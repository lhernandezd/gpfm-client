import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@material-ui/core";
import {
  Form, Formik, FormikConfig, FormikValues,
} from "formik";

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
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
      {({ isSubmitting }) => (
        <Form>
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child) => (
              <Step key={child.props.label}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          {step > 0
          && (
          <Button
            disabled={isSubmitting}
            color="primary"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress /> : null}
          >
            {isLastStep() ? "Submit" : "Next"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export function FormikStep({ children, label }) {
  return <>{children}</>;
}
