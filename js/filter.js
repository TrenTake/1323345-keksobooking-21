'use strict';

(() => {
  const typeInput = document.querySelector(`#housing-type`);
  const priceInput = document.querySelector(`#housing-price`);
  const roomInput = document.querySelector(`#housing-rooms`);
  const guestInput = document.querySelector(`#housing-guests`);

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

  const filterAdvertisement = () => {
    window.pin.clearPin();

    const cardElement = document.querySelector(`.map__card`);
    if (cardElement) {
      window.map.closeCard(cardElement);
    }

    let filteredAdvertisements = [];
    for (const advertisement of window.pin.advertisements) {
      if (
        checkType(advertisement.offer.type)
        && checkPrice(advertisement.offer.price)
        && checkRooms(advertisement.offer.rooms)
        && checkGuests(advertisement.offer.guests)
      ) {
        filteredAdvertisements.push(advertisement);
      }

      if (filteredAdvertisements.length >= window.pin.PIN_MAX_COUNT) {
        break;
      }
    }
    window.pin.pinShow(filteredAdvertisements);
  };

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

})();
