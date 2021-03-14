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
import { createEntity, getEntities } from "../../actions/entities";
import { modalFormStyles } from "../../styles";
import parseFormValues from "../../utils/parseFormValues";

const useStyles = makeStyles((theme) => modalFormStyles(theme));

const initialValues = {
  name: "",
  nit: "",
};

const EntitySchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  nit: Yup.string().required("Required"),
});

const CreateForm = ({ toggleForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const valuesUpdated = parseFormValues(values);
    await dispatch(createEntity(valuesUpdated));
    await dispatch(getEntities());
    toggleForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={EntitySchema}
    >
      {({
        submitForm, isSubmitting, dirty,
      }) => (
        <>
          {isSubmitting
            ? <LinearProgress className={classes.progress} />
            : <div className={classes.progressSkeleton} />}
          <Form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="name"
                  label="Entity Name"
                  name="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  component={TextField}
                  required
                  id="nit"
                  label="NIT #"
                  name="nit"
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
