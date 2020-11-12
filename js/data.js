'use strict';

(() => {
  const HEIGHT_PIN = 40;
  const WIDTH_PIN = 40;

  const minPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  window.data = {
    HEIGHT_PIN,
    WIDTH_PIN,
    minPrice,
  };
})();
