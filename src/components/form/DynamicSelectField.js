/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import { debounce } from "lodash";
import MuiTextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from "formik-material-ui-lab";
import parseSelectOptions from "../../utils/parseSelectOptions";

export default function DynamicSelectField(props) {
  const {
    field, reduxField, optionField, label, fetchFunc,
    touched, errors, multiple, fetchOnKeyInput, required,
    disabled, customDynamicFieldHandling, searchOnInputField,
  } = props;

  const dispatch = useDispatch();
  const fetchedOptions = useSelector((state) => state[reduxField]);
  const parsedOptions = parseSelectOptions(fetchedOptions, reduxField);
  const { isFetching = false } = fetchedOptions;
  const [isLoading, setIsLoading] = useState(isFetching);

  useEffect(() => {
    dispatch(fetchFunc());
  }, [dispatch]);

  const onFieldChange = async (e) => {
    const { value } = e.target;
    if (customDynamicFieldHandling) {
      const searchObj = customDynamicFieldHandling(value);
      await dispatch(fetchFunc({ search: searchObj }));
    } else {
      await dispatch(fetchFunc({ search: {
        [searchOnInputField]: value,
      } }));
    }
    setIsLoading(false);
  };

  const debounceCheckboxSelection = useMemo(
    () => debounce(onFieldChange, 800), [],
  );

  const onChangeParam = fetchOnKeyInput ? { onChange: (e) => {
    e.persist();
    setIsLoading(true);
    debounceCheckboxSelection(e);
  } } : {};

  return (
    <Field
      name={field}
      component={Autocomplete}
      options={parsedOptions}
      getOptionLabel={(option) => option[optionField]}
      getOptionSelected={(option, rest) => option.id === rest.id}
      multiple={multiple}
      required={required}
      disabled={disabled}
      loading={isLoading}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <MuiTextField
          {...params}
          error={touched[field] && !!errors[field]}
          helperText={touched[field] && errors[field]}
          label={label}
          required={required}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="primary" size={15} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          {...onChangeParam}
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
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fetchOnKeyInput: PropTypes.bool,
  customDynamicFieldHandling: PropTypes.func,
  searchOnInputField: PropTypes.string,
};

DynamicSelectField.defaultProps = {
  multiple: false,
  required: false,
  disabled: false,
  fetchOnKeyInput: false,
  customDynamicFieldHandling: false,
  searchOnInputField: "id",
};
