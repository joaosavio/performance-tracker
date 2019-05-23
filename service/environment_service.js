module.exports = (config = {}) => {
  const {
    forceUseDate,
  } = config;

  // !! converts to boolean
  const useProcessTime = !!(!forceUseDate && process && process.hrtime);

  const getConfig = () => ({
    useProcessTime,
  });

  return {
    getConfig,
  };
};
