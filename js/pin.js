'use strict';

(() => {
  const pinTemplate = document.querySelector(`#pin`);

  const pinShow = () => {
    const fragment = document.createDocumentFragment();
    window.data.advertisements.forEach((advertisement) => {
      const pin = pinTemplate.cloneNode(true).content.querySelector(`.map__pin`);

      pin.style.top = (advertisement.location.y - window.data.HEIGHT_PIN) + `px`;
      pin.style.left = (advertisement.location.x - window.data.WIDTH_PIN / 2) + `px`;
      const imgElement = pin.querySelector(`img`);
      imgElement.src = advertisement.author.avatar;
      pin.addEventListener(`click`, () => {
        window.card.openCard(advertisement);
      });
      fragment.appendChild(pin);
    });

    const blockMap = document.querySelector(`.map__pins`);
    blockMap.appendChild(fragment);
  };

  const mainPinElement = document.querySelector(`.map__pin--main`);

  mainPinElement.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      window.data.activeApp();
    }
  });

  mainPinElement.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.data.activeApp();
    }
  });

  window.pin = {
    pinTemplate,
    pinShow,
    mainPinElement,
  };
})();
