export const getDirectionTitle = (search) => {
  if (!search.includes("directionName")) return false;
  const directionTitle = search.split("=");
  const arrangeDirection = directionTitle[1].split("_").join(" ");
  return arrangeDirection;
};
