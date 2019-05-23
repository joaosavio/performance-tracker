const timerMap = {};

module.exports = (config = {}) => {
  const Timer = config.Timer || require('./timer')(config);

  const getMapKey = (name, key = '') => {
    if (!name) {
      throw new Error('Missing name');
    }

    return `${name}-(${key})`;
  };

  const start = (name, key) => {
    const mapKey = getMapKey(name, key);

    timerMap[mapKey] = new Timer();
    timerMap[mapKey].start();
  };

  const stop = (name, key) => {
    const mapKey = getMapKey(name, key);

    if (!timerMap[mapKey]) {
      throw new Error(`Start not called, name=${name}, key=${key}`);
    }

    timerMap[mapKey].stop();
  };

  const getTime = (name, key) => {
    const mapKey = getMapKey(name, key);

    if (!timerMap[mapKey]) {
      throw new Error(`Start not called or get time already called, name=${name}, key=${key}`);
    }

    const result = timerMap[mapKey].getTime();

    delete timerMap[mapKey];

    return result;
  };

  const getTimerMap = () => (timerMap);

  return {
    start,
    stop,
    getTime,

    getTimerMap,
    getMapKey,
  };
};
