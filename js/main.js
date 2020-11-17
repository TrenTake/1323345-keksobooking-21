'use strict';

(() => {
  const activeApp = () => {
    window.form.photoElement.disabled = false;
    window.map.element.classList.remove(`map--faded`);
    window.form.element.classList.remove(`ad-form--disabled`);
    window.utils.appConfig.isActive = true;
    window.form.setAddress();

    for (const fieldset of window.form.fieldsetElement) {
      fieldset.disabled = false;
    }

    window.filter.elements.forEach((filterElement) => {
      filterElement.disabled = false;
    });

    window.filter.featureFieldsetElement.disabled = false;
  };

  const disableApp = () => {
    window.utils.appConfig.isActive = false;
    window.map.element.classList.add(`map--faded`);
    window.form.element.classList.add(`ad-form--disabled`);
    window.form.photoElement.disabled = true;

    for (const fieldset of window.form.fieldsetElement) {
      fieldset.disabled = true;
    }

    window.filter.elements.forEach((filterElement) => {
      filterElement.disabled = true;
    });
    window.filter.featureFieldsetElement.disabled = true;

    window.map.closeCard();
    window.pin.clear();
    window.mainPin.drop();
    window.form.reset();
    window.filter.formElement.reset();
    window.utils.appConfig.withData = false;
  };

  window.form.setAddress();
  disableApp();

  window.main = {
    activeApp,
    disableApp,
  };
})();
