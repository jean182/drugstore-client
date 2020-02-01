export const freqToArray = frequency =>
  frequency.split("...").map(item => parseInt(item, 10));

export const doseToArray = dose =>
  dose.split("..").map(item => parseFloat(item));
