'use strict';

(() => {
  const filterForm = document.querySelector(`.map__filters`);
  const typeInput = filterForm.querySelector(`#housing-type`);
  const priceInput = filterForm.querySelector(`#housing-price`);
  const roomInput = filterForm.querySelector(`#housing-rooms`);
  const guestInput = filterForm.querySelector(`#housing-guests`);
  const featureFieldsetElement = filterForm.querySelector(`#housing-features`);
  const filterElements = filterForm.querySelectorAll(`.map__filter`);

  const Price = {
    ANY: `any`,
    MIDDLE: `middle`,
    LOW: `low`,
    HIGH: `high`,
  };

  const checkGuests = (guestsCount) => {
    return guestInput.value === `any` || parseInt(guestInput.value, 10) === guestsCount;
  };

  const checkRooms = (roomNumber) => {
    return roomInput.value === `any` || parseInt(roomInput.value, 10) === roomNumber;
  };

  const checkType = (type) => {
    return typeInput.value === `any` || typeInput.value === type;
  };

  const checkPrice = (price) => {
    switch (priceInput.value) {
      case Price.ANY:
        return true;

      case Price.MIDDLE:
        return price > 10000 && price < 500000;

      case Price.LOW:
        return price < 10000;

      case Price.HIGH:
        return price > 50000;

      default:
        return true;
    }
  };

  // eslint-disable-next-line valid-jsdoc
  /**
   * @param {string[]} features - Массив удобств из объекта объявления
   * @return {boolean}
   */
  const checkFeatures = (features) => {
    // перебирали инпуты и проверяли every (для каждого инпута в features есть строка из этого инпута)
    const checkedFeaturesElements = document.querySelectorAll(`.map__checkbox:checked`);
    const checkedFeaturesElementsArray = Array.from(checkedFeaturesElements);
    return checkedFeaturesElementsArray.every((featureElement) => {
      const index = features.findIndex((feature) => feature === featureElement.value);
      return index !== -1;
    });
  };

  const filterAdvertisement = () => {
    window.pin.clearPin();
    window.map.closeCard();

    let filteredAdvertisements = [];
    for (const advertisement of window.pin.advertisements) {
      if (
        checkType(advertisement.offer.type)
        && checkPrice(advertisement.offer.price)
        && checkRooms(advertisement.offer.rooms)
        && checkGuests(advertisement.offer.guests)
        && checkFeatures(advertisement.offer.features)
      ) {
        filteredAdvertisements.push(advertisement);
      }

      if (filteredAdvertisements.length >= window.pin.PIN_MAX_COUNT) {
        break;
      }
    }
    window.pin.pinShow(filteredAdvertisements);
  };

  featureFieldsetElement.addEventListener(`change`, () => {
    filterAdvertisement();
  });

  guestInput.addEventListener(`change`, () => {
    filterAdvertisement();
  });

  priceInput.addEventListener(`change`, () => {
    filterAdvertisement();
  });

  roomInput.addEventListener(`change`, () => {
    filterAdvertisement();
  });

  typeInput.addEventListener(`change`, () => {
    filterAdvertisement();
  });

  const filterPins = window.utils.debounce(() => {
    const filteredAdverts = filterAdvertisement();
    window.pin.pinShow(filteredAdverts);
  }, 300);

  filterForm.addEventListener(`change`, () => {
    filterPins();
  });

  window.filter = {
    filterForm,
    featureFieldsetElement,
    filterElements,
  };
})();
