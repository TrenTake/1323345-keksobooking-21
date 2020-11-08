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
  };

  window.pin.mainPinElement.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pin.mainPinElement.style.top = (mapElement.offsetTop - shift.y) + `px`;
      window.pin.mainPinElement.style.left = (mapElement.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          window.pin.mainPinElement.removeEventListener(`click`, onClickPreventDefault);
        };
        window.pin.mainPinElement.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.map = {
    mapElement,
    openCard,
    onEscClose,
    closeCard,
  };
})();
