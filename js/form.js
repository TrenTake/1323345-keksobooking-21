'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = document.querySelectorAll(`.ad-form__element`);


  const priceElement = document.querySelector(`#price`);
  const typeHouseElement = document.querySelector(`#type`);

  const setPrice = (type) => {
    priceElement.min = window.data.minPrice[type];
    priceElement.placeholder = window.data.minPrice[type];
  };

  const addressElement = document.querySelector(`#address`);
  const setAddress = () => {
    const xCoords = window.pin.mainPinElement.offsetLeft + window.pin.mainPinElement.offsetWidth / 2;
    const yCoords = window.pin.mainPinElement.offsetTop + window.pin.mainPinElement.offsetHeight;
    addressElement.value = xCoords + `, ` + yCoords;
    if (window.data.appConfig.isActive === true) {
      const yCoordsActive = window.pin.mainPinElement.offsetTop + window.pin.mainPinElement.offsetHeight / 2;
      addressElement.value = xCoords + `, ` + yCoordsActive;
    }
  };

  const roomNumber = document.querySelector(`#room_number`);
  const capacityElement = document.querySelector(`#capacity`);

  const roomsAndGuests = () => {
    if (roomNumber.value < capacityElement.value) {
      const message = `Количество гостей не соответствует количеству комнат`;
      capacityElement.setCustomValidity(message);
    } else if ((roomNumber.value !== `100` && capacityElement.value === `0`) || (roomNumber.value === `100` && capacityElement.value !== `0`)) {
      const message = `100 комнат не для гостей`;
      capacityElement.setCustomValidity(message);
    } else {
      const message = ``;
      capacityElement.setCustomValidity(message);
    }
  };

  const timeInElement = document.querySelector(`#timein`);
  const timeOutElement = document.querySelector(`#timeout`);

  const setTimeInOut = (select, time) => {
    select.value = time;
  };

  typeHouseElement.addEventListener(`change`, (evt) => {
    setPrice(evt.target.value);
  });

  timeInElement.addEventListener(`change`, (evt) => {
    setTimeInOut(timeOutElement, evt.target.value);
  });

  timeOutElement.addEventListener(`change`, (evt) => {
    setTimeInOut(timeInElement, evt.target.value);
  });

  window.form = {
    adForm,
    adFormFieldsets,
    priceElement,
    typeHouseElement,
    setAddress,
    setPrice,
    addressElement,
    roomNumber,
    capacityElement,
    roomsAndGuests,
    timeInElement,
    timeOutElement,
    setTimeInOut,
  };
})();
