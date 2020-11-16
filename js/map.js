'use strict';

(() => {
  const mapElement = document.querySelector(`.map`);
  const openCard = (advertisement) => {
    const cardElement = document.querySelector(`article`);
    if (cardElement) {
      closeCard(cardElement);
      window.card.createCard(advertisement);
    } else {
      window.card.createCard(advertisement);
    }
  };

  const onEscClose = (evt) => {
    const cardElement = document.querySelector(`.map__card`);
    if (evt.key === `Escape`) {
      closeCard(cardElement);
    }
  };

  const closeCard = (card) => {
    document.removeEventListener(`keydown`, onEscClose);
    card.remove();
    window.pin.deactivePin();
  };

  window.map = {
    mapElement,
    openCard,
    onEscClose,
    closeCard,
  };
})();
