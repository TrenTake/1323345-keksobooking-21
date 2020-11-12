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

  const onErrorLoad = (errorMessage) => {
    const errorElement = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorTemplate = errorElement.cloneNode(true).content.querySelector(`.error`);
    errorTemplate.querySelector(`.error__message`).textContent = errorMessage;
    const errorButton = errorTemplate.querySelector(`.error__button`);

    const onMessageClick = () => {
      errorTemplate.setAttribute(`hidden`, ``);
    };

    errorButton.addEventListener(`click`, onMessageClick);
  };

  const mainPinElement = document.querySelector(`.map__pin--main`);

  mainPinElement.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      window.main.activeApp();
      if (!window.main.appConfig.withData) {
        window.loadUnload.load((advertisements) => {
          window.pin.pinShow(advertisements);
          window.main.appConfig.withData = true;
        }, onErrorLoad);
      }
    }
  });

  mainPinElement.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.main.activeApp();
      if (!window.main.appConfig.withData) {
        window.loadUnload.load((advertisements) => {
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
    onErrorLoad,
  };
})();
