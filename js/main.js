'use strict';

(() => {
  const activeApp = () => {
    window.map.mapElement.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    appConfig.isActive = true;
    window.form.setAddress();
    window.pin.pinShow();

    for (const fieldset of window.form.adFormFieldsets) {
      fieldset.disabled = false;
    }
  };

  const disableApp = () => {
    window.map.mapElement.classList.add(`map--faded`);
    window.form.adForm.classList.add(`ad-form--disabled`);

    for (const fieldset of window.form.adFormFieldsets) {
      fieldset.disabled = true;
    }
  };

  const appConfig = {
    isActive: false,
  };

  window.main = {
    activeApp,
    disableApp,
    appConfig,
  };
})();
