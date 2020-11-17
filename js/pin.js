'use strict';

(() => {
  const PIN_MAX_COUNT = 5;
  const pinTemplate = document.querySelector(`#pin`);


  const deactivePin = () => {
    const activePinElement = window.map.mapElement.querySelector(`.map__pin--active`);
    if (activePinElement) {
      activePinElement.classList.remove(`map__pin--active`);
    }
  };

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
        deactivePin();
        pin.classList.add(`map__pin--active`);
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


  window.pin = {
    pinTemplate,
    pinShow,
    clearPin,
    advertisements: [],
    PIN_MAX_COUNT,
    deactivePin,
  };
})();
