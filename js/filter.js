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

  const PriceMiddleLimit = {
    MIN: 10000,
    MAX: 50000,
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
        return price > PriceMiddleLimit.MIN && price < PriceMiddleLimit.MAX;

      case Price.LOW:
        return price < PriceMiddleLimit.MIN;

      case Price.HIGH:
        return price > PriceMiddleLimit.MAX;

      default:
        return true;
    }
  };

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

      if (filteredAdvertisements.length >= window.pin.maxCount) {
        break;
      }
    }
    return filteredAdvertisements;
  };

  const filterPins = () => {
    window.pin.clear();
    window.map.closeCard();
    const filteredAdverts = filterAdvertisement();
    window.pin.render(filteredAdverts);
  };

  const onFilterChangeWithDebounce = window.utils.debounce(filterPins);

  filterForm.addEventListener(`change`, onFilterChangeWithDebounce);

  window.filter = {
    formElement: filterForm,
    featureFieldsetElement,
    elements: filterElements,
  };
})();
