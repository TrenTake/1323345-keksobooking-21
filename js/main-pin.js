'use strict';

(() => {
  const MAIN_PIN_TOP_DEFAULT = 375;
  const MAIN_PIN_WIDTH = 65;
  const mainPinElement = document.querySelector(`.map__pin--main`);

  const Button = {
    MAIN: 0,
  };

  const CoordsLimitY = {
    MIN: 130,
    MAX: 630,
  };


  const dropMainPin = () => {
    mainPinElement.style.top = MAIN_PIN_TOP_DEFAULT + `px`;
    mainPinElement.style.left = window.map.mapElement.clientWidth / 2 - MAIN_PIN_WIDTH / 2 + `px`;
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

  const activeApp = () => {
    if (!window.utils.appConfig.isActive) {
      window.main.activeApp();
    }

    if (!window.utils.appConfig.withData) {
      window.api.loadAdvertisement(
          (response) => {
            window.pin.advertisements = response.filter((advertisement) => !!advertisement.offer);
            window.pin.pinShow(window.pin.advertisements);
            window.utils.appConfig.withData = true;
          },
          showErrorMessage
      );
    }
  };

  const movePin = (evt) => {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newCoords = {
        x: Math.round(mainPinElement.offsetLeft + mainPinElement.clientWidth / 2 - shift.x),
        y: mainPinElement.offsetTop - shift.y,
      };

      if (
        newCoords.x > 0 && newCoords.x < window.map.mapElement.clientWidth
        && (newCoords.y + mainPinElement.clientHeight) >= CoordsLimitY.MIN && newCoords.y <= CoordsLimitY.MAX
      ) {
        mainPinElement.style.left = mainPinElement.offsetLeft - shift.x + `px`;
        mainPinElement.style.top = newCoords.y + `px`;
        window.form.setAddress();
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };


  mainPinElement.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    if (evt.button !== Button.MAIN) {
      return;
    }

    activeApp();
    movePin(evt);
  });

  mainPinElement.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      activeApp();
    }
  });


  window.mainPin = {
    drop: dropMainPin,
    element: mainPinElement,
  };
})();
