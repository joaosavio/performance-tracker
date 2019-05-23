const isNumber = (value) => {
  if (typeof value === 'undefined') {
    return false;
  }

  // eslint-disable-next-line no-restricted-globals
  return !isNaN(value) && !isNaN(parseFloat(value));
};

const hrtimeToNumber = (hrtime) => {
  const result = hrtime[0] * 1e3 + hrtime[1] * 1e-6;
  return result.toFixed(3);
};

module.exports = {
  isNumber,
  hrtimeToNumber,
};
