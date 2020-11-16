'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 300;
  const appConfig = {
    isActive: false,
    withData: false,
  };

  const debounce = (cb) => {
    const lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    appConfig,
    debounce,
  };
})();
