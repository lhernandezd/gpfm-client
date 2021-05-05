import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  LinearProgress,
  Grid,
} from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import DynamicSelectField from "../form/DynamicSelectField";
import { createAgreement, getAgreements } from "../../actions/agreements";
import { getEntities } from "../../actions/entities";
import { modalFormStyles } from "../../styles";
import parseFormValues from "../../utils/parseFormValues";

const useStyles = makeStyles((theme) => modalFormStyles(theme));

const initialValues = {
  name: "",
  code: "",
};

const AgreementSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
});

const CreateForm = ({ toggleForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const valuesUpdated = parseFormValues(values);
    await dispatch(createAgreement(valuesUpdated));
    await dispatch(getAgreements());
    toggleForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={AgreementSchema}
    >
      {({
        submitForm, isSubmitting, dirty, touched, errors,
      }) => (
        <>
          {isSubmitting
            ? <LinearProgress className={classes.progress} />
            : <div className={classes.progressSkeleton} />}
          <Form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <DynamicSelectField
                  field="entity_id"
                  reduxField="entities"
                  label="Entity"
                  fetchFunc={getEntities}
                  optionField="label"
                  touched={touched}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="name"
                  label="Agreement Name"
                  name="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="code"
                  label="Code"
                  name="code"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} className={classes.actions}>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={toggleForm}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={isSubmitting || !dirty}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default CreateForm;

CreateForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/require-default-props
  toggleForm: PropTypes.func,
};
