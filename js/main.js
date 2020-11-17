'use strict';

(() => {
  const activeApp = () => {
    window.form.photoElement.disabled = false;
    window.map.mapElement.classList.remove(`map--faded`);
    window.form.adForm.classList.remove(`ad-form--disabled`);
    window.utils.appConfig.isActive = true;
    window.form.setAddress();

    for (const fieldset of window.form.adFormFieldsets) {
      fieldset.disabled = false;
    }

    window.filter.filterElements.forEach((filterElement) => {
      filterElement.disabled = false;
    });

    window.filter.featureFieldsetElement.disabled = false;
  };

  const disableApp = () => {
    window.utils.appConfig.isActive = false;
    window.map.mapElement.classList.add(`map--faded`);
    window.form.adForm.classList.add(`ad-form--disabled`);
    window.form.photoElement.disabled = true;

    for (const fieldset of window.form.adFormFieldsets) {
      fieldset.disabled = true;
    }

    window.filter.filterElements.forEach((filterElement) => {
      filterElement.disabled = true;
    });
    window.filter.featureFieldsetElement.disabled = true;

    window.map.closeCard();
    window.pin.clearPin();
    window.mainPin.drop();
    window.form.reset();
    window.filter.filterForm.reset();
    window.utils.appConfig.withData = false;
  };

  window.form.setAddress();
  disableApp();

  window.main = {
    activeApp,
    disableApp,
  };
})();
