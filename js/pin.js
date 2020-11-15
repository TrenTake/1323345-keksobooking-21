'use strict';

(() => {
  const PIN_MAX_COUNT = 5;
  const pinTemplate = document.querySelector(`#pin`);
  const mainPinElement = document.querySelector(`.map__pin--main`);

  const pinShow = (data) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length && i < PIN_MAX_COUNT; i++) {
      const pin = pinTemplate.cloneNode(true).content.querySelector(`.map__pin`);
      const HEIGHT_PIN = 40;
      const WIDTH_PIN = 40;
      pin.style.top = (data[i].location.y - HEIGHT_PIN) + `px`;
      pin.style.left = (data[i].location.x - WIDTH_PIN / 2) + `px`;
      const imgElement = pin.querySelector(`img`);
      imgElement.src = data[i].author.avatar;
      pin.addEventListener(`click`, () => {
        window.map.openCard(data[i]);
      });
      fragment.appendChild(pin);
    }

    const blockMap = document.querySelector(`.map__pins`);
    blockMap.appendChild(fragment);
  };

  const clearPin = () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => {
      pin.remove();
    });
  };

  const showErrorMessage = (errorMessage) => {
    const errorElement = document.querySelector(`#error`).cloneNode(true).content.querySelector(`.error`);
    const errorMessageElement = errorElement.querySelector(`.error__message`);
    const errorButtonElement = errorElement.querySelector(`.error__button`);
    errorButtonElement.remove();
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

  mainPinElement.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      window.main.activeApp();
      if (!window.main.appConfig.withData) {
        window.api.loadAdvertisement(
            (response) => {
              window.pin.advertisements = response;
              pinShow(window.pin.advertisements);
              window.main.appConfig.withData = true;
            },
            showErrorMessage
        );
      }
    }
  });

  mainPinElement.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.main.activeApp();
      if (!window.main.appConfig.withData) {
        window.api.loadAdvertisement((response) => {
          window.pin.advertisements = response;
          pinShow(window.pin.advertisements);
          window.main.appConfig.withData = true;
        });
      }
    }
  });

  window.pin = {
    pinTemplate,
    pinShow,
    mainPinElement,
    showErrorMessage,
    clearPin,
    advertisements: [],
    PIN_MAX_COUNT,
  };
})();
