import { get } from "lodash";

export const getDirectionTitleFromState = (state) => {
  const directionTitle = get(state, "directionName", false);
  if (!directionTitle) return false;
  const arrangeDirection = directionTitle.split("_").join(" ");
  return arrangeDirection;
};
