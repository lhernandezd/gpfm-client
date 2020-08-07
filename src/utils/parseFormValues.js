import {
  forIn, isObject, isDate, isArray, cloneDeep,
} from "lodash";

const parseFormValues = (formValues) => {
  const updatedFormValues = cloneDeep(formValues);
  forIn(updatedFormValues, (value, key) => {
    if (isObject(value) && !isDate(value)) updatedFormValues[key] = value.name;
    if (key === "roles" && isArray(value)) {
      const rolesUpdated = formValues[key].map((roles) => roles.name);
      updatedFormValues[key] = rolesUpdated;
    }
    if (key === "city_id" && isObject(value)) updatedFormValues[key] = value.id;
  });
  return updatedFormValues;
};

export default parseFormValues;
