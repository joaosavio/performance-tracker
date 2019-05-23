module.exports = (config = {}) => {
  const timerService = config.timerService || require('./timer_service')(config);

  class Timer {
    constructor() {
      this.startTime = undefined;
      this.stopTime = undefined;
      this.totalTime = undefined;
    }

    start(startTime) {
      this.startTime = startTime || timerService.getCurrentTime();
    }

    stop(stopTime) {
      this.stopTime = stopTime || timerService.getCurrentTime();
    }

    getTime() {
      if (typeof this.totalTime !== 'undefined') {
        return this.totalTime;
      }

      const result = timerService.getDuration(this.startTime, this.stopTime);
      if (result < 0) {
        return -1;
      }

      // Caches totalTime
      this.totalTime = result;

      return result;
    }
  }

  return Timer;
};
