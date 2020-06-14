import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useField} from 'formik';

export default function FormikCheckbox(props) {
  const fieldToCheckbox = ({field, meta, helper}) => {
    return {
      ...props,
      ...field,
      ...meta,
      ...helper,
      disabled: props.disabled ?? props.isSubmitting,
      checked: field.value,
    };
  }

  const CustomCheckbox = (customProps) => {
    if (props.label) {
      return (
        <FormControlLabel 
          label={props.label}
          control={<Checkbox {...fieldToCheckbox(customProps)}/>}
        />
      );
    } else {
      return <Checkbox {...fieldToCheckbox(customProps)}/>
    }
  }

  const [field, meta, helper] = useField(props.name);
  return (
    <CustomCheckbox field={field} meta={meta} helper={helper}/>
  );
};

FormikCheckbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
};
