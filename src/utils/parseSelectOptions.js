import { get, capitalize } from "lodash";

const parseCities = (cities) => {
  const citiesParsed = cities.reduce((acc, currentValue) => {
    const cityObj = {
      id: currentValue.id,
      label: `${currentValue.name}, ${currentValue.state?.name}`,
    };
    return acc.concat(cityObj);
  }, []);
  return citiesParsed;
};

const parseCodes = (codes) => {
  const codesParsed = codes.reduce((acc, currentValue) => {
    const codeObj = {
      id: currentValue.id,
      label: `${currentValue.code} - ${currentValue.description}`,
    };
    return acc.concat(codeObj);
  }, []);
  return codesParsed;
};

const parsePatients = (patients) => {
  const codesParsed = patients.reduce((acc, currentValue) => {
    const codeObj = {
      id: currentValue.id,
      label: `${currentValue.first_name} ${currentValue.last_name}`,
    };
    return acc.concat(codeObj);
  }, []);
  return codesParsed;
};

const parseOptions = (options) => {
  const optionsParsed = options.reduce((acc, currentValue) => {
    const optionObjs = {
      id: currentValue.id,
      label: `${capitalize(currentValue.name)}`,
    };
    return acc.concat(optionObjs);
  }, []);
  return optionsParsed;
};

const parseSelectOptions = (data, field) => {
  const options = get(data, "data", data);
  if (!options.length) return [];
  switch (field) {
    case "cities":
      return parseCities(options);
    case "codes":
      return parseCodes(options);
    case "patients":
      return parsePatients(options);
    default:
      return parseOptions(options);
  }
};

export default parseSelectOptions;
