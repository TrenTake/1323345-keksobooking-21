'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 300;

  const KeyboardKey = {
    ENTER: `Enter`,
    ESCAPE: `Escape`,
  };

  const appConfig = {
    isActive: false,
    withData: false,
  };

  const debounce = (cb) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    appConfig,
    debounce,
    KeyboardKey,
  };
})();
