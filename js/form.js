'use strict';

(() => {
  const MAINPIN_TOP_DEFAULT = 375;
  const MAINPIN_WIDTH = 65;
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = document.querySelectorAll(`.ad-form__element`);
  const addressElement = document.querySelector(`#address`);
  const priceElement = document.querySelector(`#price`);
  const typeHouseElement = document.querySelector(`#type`);

  const setPrice = (type) => {
    const minPrice = {
      bungalow: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    priceElement.min = minPrice[type];
    priceElement.placeholder = minPrice[type];
  };

  const setAddress = () => {
    const xCoords = window.pin.mainPinElement.offsetLeft + window.pin.mainPinElement.offsetWidth / 2;
    const yCoords = window.pin.mainPinElement.offsetTop + window.pin.mainPinElement.offsetHeight;
    addressElement.value = xCoords + `, ` + yCoords;
    if (window.main.appConfig.isActive === true) {
      const yCoordsActive = window.pin.mainPinElement.offsetTop + window.pin.mainPinElement.offsetHeight / 2;
      addressElement.value = xCoords + `, ` + yCoordsActive;
    }
  };

  const resetForm = () => {
    adForm.reset();
    setAddress();
  };

  const dropMainPin = () => {
    window.pin.mainPinElement.style.top = MAINPIN_TOP_DEFAULT + `px`;
    window.pin.mainPinElement.style.left = window.map.mapElement.clientWidth / 2 - MAINPIN_WIDTH / 2 + `px`;
  };

  const roomNumberElement = document.querySelector(`#room_number`);
  const capacityElement = document.querySelector(`#capacity`);

  capacityElement.addEventListener(`change`, () => {
    roomsAndGuests();
  });

  roomNumberElement.addEventListener(`change`, () => {
    roomsAndGuests();
  });

  const roomsAndGuests = () => {
    const roomNumber = parseInt(roomNumberElement.value, 10);
    const capacityNumber = parseInt(capacityElement.value, 10);
    if (roomNumber < capacityNumber) {
      const message = `Количество гостей не соответствует количеству комнат`;
      capacityElement.setCustomValidity(message);
    } else if ((roomNumber !== 100 && capacityNumber === 0) || (roomNumber === 100 && capacityNumber !== 0)) {
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

  const showSuccessMessage = () => {
    const messageElement = document.querySelector(`#success`).cloneNode(true).content.querySelector(`.success`);
    const closeMessage = () => {
      messageElement.remove();
      document.removeEventListener(`keydown`, onPupEsc);
    };

    const onPupEsc = (evt) => {
      if (evt.key === `Escape`) {
        closeMessage();
      }
    };

    document.addEventListener(`keydown`, onPupEsc);
    messageElement.addEventListener(`click`, () => {
      closeMessage();
    });

    document.body.appendChild(messageElement);
  };

  const showErrorMessage = (errorMessage) => {
    const errorElement = document.querySelector(`#error`).cloneNode(true).content.querySelector(`.error`);
    const errorMessageElement = errorElement.querySelector(`.error__message`);
    errorMessageElement.textContent = errorMessage;

    const closeMessage = () => {
      errorElement.remove();
      document.removeEventListener(`keydown`, onPopupEsc);
    };

    errorElement.addEventListener(`click`, () => {
      closeMessage();
    });

    const onPopupEsc = (evt) => {
      if (evt.key === `Escape`) {
        closeMessage();
      }
    };

    document.addEventListener(`keydown`, onPopupEsc);
    document.body.appendChild(errorElement);
  };

  const resetButton = adForm.querySelector(`.ad-form__reset`);
  resetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    resetForm();
  });


  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const data = new FormData(adForm);

    window.loadUnload.upload(data, () => {
      window.pin.clearPin();
      dropMainPin();
      resetForm();
      window.main.disableApp();
      window.main.appConfig.withData = false;
      showSuccessMessage();
    }, () => {
      showErrorMessage();
    });
  });

  setAddress();
  roomsAndGuests();

  window.form = {
    adForm,
    adFormFieldsets,
    priceElement,
    typeHouseElement,
    setAddress,
    setPrice,
    addressElement,
    roomNumberElement,
    capacityElement,
    roomsAndGuests,
    timeInElement,
    timeOutElement,
    setTimeInOut,
  };
})();
