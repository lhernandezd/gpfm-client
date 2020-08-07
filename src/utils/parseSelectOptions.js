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
  const options = get(data, "data");
  if (!options.length) return [];
  switch (field) {
    case "cities":
      return parseCities(options);
    default:
      return parseOptions(options);
  }
};

export default parseSelectOptions;
