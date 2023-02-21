import { addComma, unComma } from "../commas";

export const calc = (prev, op, curr) => {
  const unCommaPrev = unComma(prev);
  const unCommaCurr = unComma(curr);
  let result = "";
  switch (op) {
    case "+":
      result = parseInt(unCommaPrev) + parseInt(unCommaCurr);
      break;
    case "-":
      result = unCommaPrev - unCommaCurr;
      break;
    case "×":
      result = unCommaPrev * unCommaCurr;
      break;
    case "÷":
      result = unCommaPrev / unCommaCurr;
      break;
    default:
      result = unCommaCurr;
      break;
  }
  return addComma(result);
};
