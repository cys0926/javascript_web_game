export const addComma = (number) => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return number.toString().replace(regexp, ",");
};

export const unComma = (number) => {
  return number.replaceAll(",", "");
};
