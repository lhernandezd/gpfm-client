/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import MuiTextField from "@material-ui/core/TextField";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import parseSelectOptions from "../../utils/parseSelectOptions";

export default function DynamicSelectField(props) {
  const {
    field, reduxField, optionField, label, fetchFunc, touched, errors,
  } = props;
  const dispatch = useDispatch();
  const fetchedOptions = useSelector((state) => state[reduxField]);
  const parsedOptions = parseSelectOptions(fetchedOptions, reduxField);

  useEffect(() => {
    dispatch(fetchFunc());
  }, []);

  return (
    <Field
      name={field}
      component={Autocomplete}
      options={parsedOptions}
      getOptionLabel={(option) => option[optionField]}
      getOptionSelected={(option, rest) => option.id === rest.id}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <MuiTextField
          {...params}
          error={touched[field] && !!errors[field]}
          helperText={touched[field] && errors[field]}
          label={label}
        />
      )}
    />
  );
}

DynamicSelectField.propTypes = {
  field: PropTypes.string.isRequired,
  reduxField: PropTypes.string.isRequired,
  optionField: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fetchFunc: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
