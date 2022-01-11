import { find, get } from "lodash";

const getFieldFromState = (state, filterField, filterFieldValue, field) => {
  const valueDesired = find(state, (value) => value[filterField] === filterFieldValue);
  return get(valueDesired, `${field}`);
};

export default getFieldFromState;
