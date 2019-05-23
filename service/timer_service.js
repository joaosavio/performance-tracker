const utils = require('./utils');

module.exports = (config = {}) => {
  const environmentService = config.environmentService || require('./environment_service')(config);

  const {
    useProcessTime,
  } = environmentService.getConfig();

  const getCurrentTime = () => {
    if (useProcessTime) {
      return utils.hrtimeToNumber(process.hrtime());
    }

    return Date.now().toFixed(1);
  };

  const getDuration = (startTime, endTime) => {
    if (!startTime || !endTime || startTime > endTime) {
      return -1;
    }

    return endTime - startTime;
  };

  return {
    getCurrentTime,
    getDuration,
  };
};
