import { intersection } from "lodash";

export const isAdmin = (roles) => {
  const intersectionLength = intersection(roles, ["admin"]).length;
  return !!intersectionLength;
};

export const isAdminOrUser = (roles) => {
  const intersectionLength = intersection(roles, ["admin", "user"]).length;
  return !!intersectionLength;
};
