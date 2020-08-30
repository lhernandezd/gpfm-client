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
    if (key.includes("_id") && isObject(value)) updatedFormValues[key] = value.id;
    if (key.includes("_id") && isArray(value)) {
      const valudIDS = formValues[key].map((valueKey) => valueKey.id);
      updatedFormValues[key] = valudIDS;
    }
  });
  return updatedFormValues;
};

export default parseFormValues;
