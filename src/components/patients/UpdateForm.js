/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  capitalize, toUpper, get, startCase,
} from "lodash";
import {
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import MuiTextField from "@material-ui/core/TextField";
import {
  Field, FieldArray,
} from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import { updatePatient } from "../../actions/patients";
import {
  documentTypes as DefaultTypes,
  genders as DefaultGenders,
  civilStatus as DefaultStatus,
  bloodTypes as DefaultBloods,
} from "../../utils/staticDataTypes";
import parseFormValues from "../../utils/parseFormValues";
import parseSelectOptions from "../../utils/parseSelectOptions";
import DynamicSelectField from "../form/DynamicSelectField";
import { getCities } from "../../actions/cities";
import { getAgreements } from "../../actions/agreements";
import { FormikStepper, FormikStep } from "../form/FormikStepForm";

const PatientSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
  phone_number: Yup.string().matches(/^\d+$/, "Should have digits only"),
  address: Yup.string().required("Required"),
  document_type: Yup.object().required("Required"),
  document: Yup.string().required("Required"),
  birth_date: Yup.date(),
  gender: Yup.object(),
  neighborhood: Yup.string(),
  occupation: Yup.string(),
  civil_status: Yup.object(),
  blood_type: Yup.object(),
  agreement_id: Yup.object({
    id: Yup.string().required("Required"),
    label: Yup.string(),
  }),
  contacts: Yup.array().of(
    Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email"),
      phone_number: Yup.string().matches(/^\d+$/, "Should have digits only"),
      occupation: Yup.string().required("Required"),
    }),
  ),
});

const UpdateForm = ({ patient, toggleForm }) => {
  const dispatch = useDispatch();

  const city = get(patient, "city", {});
  const agreement = get(patient, "agreement", {});
  const contacts = get(patient, "contacts");
  const removedContacts = [];

  const initialValues = {
    first_name: get(patient, "first_name"),
    last_name: get(patient, "last_name"),
    email: get(patient, "email"),
    phone_number: get(patient, "phone_number"),
    address: get(patient, "address"),
    document_type: { name: get(patient, "document_type") },
    document: get(patient, "document"),
    gender: { name: get(patient, "gender") },
    civil_status: { name: get(patient, "civil_status") },
    blood_type: { name: get(patient, "blood_type") },
    birth_date: get(patient, "birth_date"),
    neighborhood: get(patient, "neighborhood"),
    occupation: get(patient, "first_name"),
    contacts,
    city_id: parseSelectOptions({ data: [city] }, "cities")[0],
    agreement_id: parseSelectOptions({ data: [agreement] })[0],
  };

  const handleSubmit = async (values) => {
    const valuesUpdated = parseFormValues(values);
    await dispatch(updatePatient(patient.id, {
      ...valuesUpdated,
      contacts: values.contacts,
      remove_contacts: removedContacts,
    }));
    toggleForm();
  };

  const handleRemovedContacts = (contact, index, remove) => {
    if (contact.id) removedContacts.push(contact);
    remove(index);
  };

  return (
    <FormikStepper
      validationSchema={PatientSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      toggleAction={toggleForm}
    >
      <FormikStep label="Basic Information">
        {(stepProps) => (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                required
                id="first_name"
                label="First Name"
                name="first_name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                required
                id="last_name"
                label="Last Name"
                name="last_name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                required
                name="document_type"
                component={Autocomplete}
                options={DefaultTypes}
                getOptionLabel={(option) => toUpper(option.name)}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    error={stepProps.touched.document_type && !!stepProps.errors.document_type}
                    helperText={stepProps.touched.document_type && stepProps.errors.document_type}
                    label="Document Type"
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="document"
                label="Document Number"
                name="document"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <DynamicSelectField
                field="city_id"
                reduxField="cities"
                label="City"
                fetchFunc={getCities}
                optionField="label"
                touched={stepProps.touched}
                errors={stepProps.errors}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                id="address"
                label="Address"
                name="address"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs sm={12} md={6}>
              <Field
                component={KeyboardDatePicker}
                id="birth_date"
                name="birth_date"
                label="Birth Date"
                variant="inline"
                format="dd/MM/yyyy"
                fullWidth
              />
            </Grid>
            <Grid item xs sm={12} md={6}>
              <Field
                name="gender"
                component={Autocomplete}
                options={DefaultGenders}
                getOptionLabel={(option) => startCase(option.name)}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    error={stepProps.touched.gender && !!stepProps.errors.gender}
                    helperText={stepProps.touched.gender && stepProps.errors.gender}
                    label="Gender"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                id="phone_number"
                label="Phone Number"
                name="phone_number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                id="email"
                label="Email Address"
                name="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="neighborhood"
                label="Neighborhood"
                name="neighborhood"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                component={TextField}
                id="occupation"
                label="Occupation"
                name="occupation"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                name="civil_status"
                component={Autocomplete}
                options={DefaultStatus}
                getOptionLabel={(option) => capitalize(option.name)}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    error={stepProps.touched.civil_status && !!stepProps.errors.civil_status}
                    helperText={stepProps.touched.civil_status && stepProps.errors.civil_status}
                    label="Civil Status"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Field
                name="blood_type"
                component={Autocomplete}
                options={DefaultBloods}
                getOptionLabel={(option) => toUpper(option.name)}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    error={stepProps.touched.blood_type && !!stepProps.errors.blood_type}
                    helperText={stepProps.touched.blood_type && stepProps.errors.blood_type}
                    label="Blood Type"
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
      </FormikStep>
      <FormikStep label="Agreement Information">
        {(stepProps) => (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <DynamicSelectField
                field="agreement_id"
                reduxField="agreements"
                label="Agreement"
                fetchFunc={getAgreements}
                optionField="label"
                touched={stepProps.touched}
                errors={stepProps.errors}
                required
              />
            </Grid>
          </Grid>
        )}
      </FormikStep>
      <FormikStep label="Contacts Information">
        {(stepProps) => (
          <FieldArray name="contacts">
            {({ insert, remove, push }) => (
              <Grid container spacing={3}>
                <Grid item container xs={12} alignItems="center">
                  <Grid item>
                    <Typography variant="subtitle2" component="p">
                      Add Contacts
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => push({
                      first_name: "", last_name: "", email: "", phone_number: "", occupation: "",
                    })}
                    >
                      <AddCircleOutlineRoundedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                {stepProps.values.contacts.length > 0
                && stepProps.values.contacts.map((contact, index) => (
                  <Grid item container justify="space-between">
                    <Grid item container spacing={3} xs={10}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          component={TextField}
                          id={`contacts.${index}.first_name`}
                          label="First Name"
                          name={`contacts.${index}.first_name`}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          component={TextField}
                          id={`contacts.${index}.last_name`}
                          label="Last Name"
                          name={`contacts.${index}.last_name`}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          id={`contacts.${index}.email`}
                          label="Email"
                          name={`contacts.${index}.email`}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          component={TextField}
                          id={`contacts.${index}.phone_number`}
                          label="Phone Number"
                          name={`contacts.${index}.phone_number`}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Field
                          component={TextField}
                          id={`contacts.${index}.occupation`}
                          label="Occupation"
                          name={`contacts.${index}.occupation`}
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={2} alignContent="center">
                      <Grid item xs={2} sm={2} md={2}>
                        <IconButton onClick={() => handleRemovedContacts(contact, index, remove)}>
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
          </FieldArray>
        )}
      </FormikStep>
    </FormikStepper>
  );
};

export default UpdateForm;

UpdateForm.propTypes = {
  patient: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  toggleForm: PropTypes.func,
};
