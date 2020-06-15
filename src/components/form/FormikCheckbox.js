import React from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useField } from "formik";

export default function FormikCheckbox(props) {
  const fieldToCheckbox = ({ field, meta, helper }) => ({
    ...props,
    ...field,
    ...meta,
    ...helper,
    disabled: props.disabled ?? props.isSubmitting,
    checked: field.value,
  });

  const { label, name } = props;

  const CustomCheckbox = (customProps) => {
    if (label) {
      return (
        <FormControlLabel
          label={props.label}
          control={<Checkbox {...fieldToCheckbox(customProps)} />}
        />
      );
    }
    return <Checkbox {...fieldToCheckbox(customProps)} />;
  };

  const [field, meta, helper] = useField(name);
  return (
    <CustomCheckbox field={field} meta={meta} helper={helper} />
  );
}

FormikCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  isSubmitting: PropTypes.bool,
};

FormikCheckbox.defaultProps = {
  disabled: false,
  label: "",
  isSubmitting: false,
};
