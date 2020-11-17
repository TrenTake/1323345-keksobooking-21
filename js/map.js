'use strict';

(() => {
  const mapElement = document.querySelector(`.map`);
  const openCard = (advertisement) => {
    closeCard();
    window.card.render(advertisement);
  };

  const onEscClose = (evt) => {
    if (evt.key === window.utils.KeyboardKey.ESCAPE) {
      closeCard();
    }
  };

  const closeCard = () => {
    const cardElement = document.querySelector(`.map__card`);
    if (cardElement) {
      cardElement.remove();
      document.removeEventListener(`keydown`, onEscClose);
      window.pin.deactive();
    }
  };

  window.map = {
    element: mapElement,
    openCard,
    onEscClose,
    closeCard,
  };
})();
