/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
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
import * as uuid from "uuid";
import * as Yup from "yup";
import { get } from "lodash";
import { TextField } from "formik-material-ui";
import { KeyboardTimePicker } from "formik-material-ui-pickers";
import DynamicSelectField from "../form/DynamicSelectField";
import { getPatients } from "../../actions/patients";
import { createAppointment, getAppointments } from "../../actions/appointments";
import { modalFormStyles } from "../../styles";
import parseFormValues from "../../utils/helpers/parseFormValues";

const useStyles = makeStyles((theme) => modalFormStyles(theme));

const AppointmentSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string(),
  start_date: Yup.date(),
  end_date: Yup.date(),
  patient_id: Yup.object({
    id: Yup.string().required("Required"),
    label: Yup.string(),
  }),
});

const CreateForm = ({ toggleForm, appointment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    description: "",
    start_date: get(appointment, "start"),
    end_date: get(appointment, "end"),
  };

  const handleSubmit = async (values) => {
    const appoinmentId = uuid.v4();
    const valuesUpdated = parseFormValues(values);
    await dispatch(createAppointment({
      ...valuesUpdated,
      id: appoinmentId,
      all_day: false,
    }));
    appointment.view.calendar.addEvent({
      id: appoinmentId,
      title: valuesUpdated.title,
      start: valuesUpdated.start_date,
      end: valuesUpdated.end_date,
      allDay: valuesUpdated.allDay,
    });
    await dispatch(getAppointments());
    toggleForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={AppointmentSchema}
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
                <Field
                  component={TextField}
                  required
                  id="title"
                  label="Appointment Title"
                  name="title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Field
                  component={TextField}
                  id="description"
                  label="Description"
                  name="description"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <DynamicSelectField
                  field="patient_id"
                  reduxField="patients"
                  label="Patient"
                  fetchFunc={getPatients}
                  optionField="label"
                  touched={touched}
                  errors={errors}
                  required
                />
              </Grid>
              <Grid item xs sm={12} md={6}>
                <Field
                  component={KeyboardTimePicker}
                  id="start_date"
                  name="start_date"
                  label="Start Date"
                  variant="inline"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs sm={12} md={6}>
                <Field
                  component={KeyboardTimePicker}
                  id="end_date"
                  name="end_date"
                  label="End Date"
                  variant="inline"
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
  appointment: PropTypes.object,
};
