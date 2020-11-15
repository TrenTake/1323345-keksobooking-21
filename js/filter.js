'use strict';

(() => {
  const typeInput = document.querySelector(`#housing-type`);

  typeInput.addEventListener(`change`, () => {
    window.pin.clearPin();

    const cardElement = document.querySelector(`.map__card`);
    if (cardElement) {
      window.map.closeCard(cardElement);
    }

    let filteredAdvertisements = [];
    for (const advertisement of window.pin.advertisements.slice()) {
      if (typeInput.value === advertisement.offer.type) {
        filteredAdvertisements.push(advertisement);
      }

      if (filteredAdvertisements.length >= window.pin.PIN_MAX_COUNT) {
        break;
      }
    }
    window.pin.pinShow(filteredAdvertisements);

  });

})();
