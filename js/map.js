'use strict';

(() => {
  const mapElement = document.querySelector(`.map`);
  const openCard = (advertisement) => {
    closeCard();
    window.card.createCard(advertisement);
  };

  const onEscClose = (evt) => {
    if (evt.key === `Escape`) {
      closeCard();
    }
  };

  const closeCard = () => {
    const cardElement = document.querySelector(`.map__card`);
    if (cardElement) {
      cardElement.remove();
      document.removeEventListener(`keydown`, onEscClose);
      window.pin.deactivePin();
    }
  };

  window.map = {
    mapElement,
    openCard,
    onEscClose,
    closeCard,
  };
})();
