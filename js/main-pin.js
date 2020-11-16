'use strict';

(() => {
  const CoordsLimitY = {
    MIN: 130,
    MAX: 630,
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

      const newCoords = {
        x: Math.round(window.pin.mainPinElement.offsetLeft + window.pin.mainPinElement.clientWidth / 2 - shift.x),
        y: window.pin.mainPinElement.offsetTop - shift.y,
      };

      if (newCoords.x > 0 && newCoords.x < window.map.mapElement.clientWidth && newCoords.y > CoordsLimitY.MIN && newCoords.y < CoordsLimitY.MAX) {
        window.pin.mainPinElement.style.left = window.pin.mainPinElement.offsetLeft - shift.x + `px`;
        window.pin.mainPinElement.style.top = newCoords.y + `px`;
        window.form.setAddress();
      }
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
})();
