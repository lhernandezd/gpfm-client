import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

export default function FormikField(props) {
  const {
    name, disabled, isSubmitting, helperText,
  } = props;
  const fieldToTextField = ({ field, meta, helper }) => {
    const showError = meta.touched && !!meta.error;

    return {
      ...props,
      ...field,
      ...meta,
      ...helper,
      error: showError,
      helperText: showError ? meta.error : helperText,
      disabled: disabled ?? isSubmitting,
    };
  };
  const [field, meta, helper] = useField(name);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      {...fieldToTextField({ field, meta, helper })}
    />
  );
}

FormikField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  helperText: PropTypes.string,
};

FormikField.defaultProps = {
  disabled: false,
  helperText: "",
  isSubmitting: false,
};
