import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {useField} from 'formik';

export default function FormikField(props) {
  const fieldToTextField = ({field, meta, helper}) => {
    const showError = meta.touched && !!meta.error;
    
    return {
      ...props,
      ...field,
      ...meta,
      ...helper,
      error: showError,
      helperText: showError ? meta.error : props.helperText,
      disabled: props.disabled ?? props.isSubmitting,
    };
  }
  const [field, meta, helper] = useField(props.name);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
     {...fieldToTextField({field, meta, helper})}
    />
  );
}

FormikField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
};
