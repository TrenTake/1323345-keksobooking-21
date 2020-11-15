'use strict';

(() => {
  const pinTemplate = document.querySelector(`#pin`);

  const pinShow = (advertisements) => {
    const fragment = document.createDocumentFragment();
    advertisements.forEach((advertisement) => {
      const pin = pinTemplate.cloneNode(true).content.querySelector(`.map__pin`);
      const HEIGHT_PIN = 40;
      const WIDTH_PIN = 40;
      pin.style.top = (advertisement.location.y - HEIGHT_PIN) + `px`;
      pin.style.left = (advertisement.location.x - WIDTH_PIN / 2) + `px`;
      const imgElement = pin.querySelector(`img`);
      imgElement.src = advertisement.author.avatar;
      pin.addEventListener(`click`, () => {
        window.map.openCard(advertisement);
      });
      fragment.appendChild(pin);
    });

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

  const mainPinElement = document.querySelector(`.map__pin--main`);

  mainPinElement.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      window.main.activeApp();
      if (!window.main.appConfig.withData) {
        window.api.loadAdvertisement((advertisements) => {
          pinShow(advertisements);
          window.main.appConfig.withData = true;
        }, showErrorMessage);
      }
    }
  });

  mainPinElement.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.main.activeApp();
      if (!window.main.appConfig.withData) {
        window.api.loadAdvertisement((advertisements) => {
          window.pin.pinShow(advertisements);
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
  };
})();
