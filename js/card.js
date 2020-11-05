'use strict';

(() => {
  const cardTemplate = document.querySelector(`#card`);

  const openCard = (advertisement) => {
    const cardElement = document.querySelector(`article`);
    if (cardElement) {
      closeCard(cardElement);
      createCard(advertisement);
    } else {
      createCard(advertisement);
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


  const createCard = (advertisement) => {
    const cardElement = cardTemplate.cloneNode(true).content.querySelector(`.map__card`);
    const titleElement = cardElement.querySelector(`.popup__title`);
    titleElement.textContent = advertisement.offer.title;
    const addressElement = cardElement.querySelector(`.popup__text--address`);
    addressElement.textContent = advertisement.offer.address;
    const priceElement = cardElement.querySelector(`.popup__text--price`);
    priceElement.textContent = advertisement.offer.price + `₽/ночь`;
    const typeElemennt = cardElement.querySelector(`.popup__type`);
    typeElemennt.textContent = advertisement.offer.type;
    const roomElement = cardElement.querySelector(`.popup__text--capacity`);
    roomElement.textContent = advertisement.offer.rooms + `комнаты для` + advertisement.offer.guests + `гостей`;
    const checkinElement = cardElement.querySelector(`.popup__text--time`);
    checkinElement.textContent = `Заезд после ` + advertisement.offer.checkin + `, выезд до ` + advertisement.offer.checkout;
    const avatarElement = cardElement.querySelector(`.popup__avatar`);
    avatarElement.src = advertisement.author.avatar;

    const cardFeatures = cardElement.querySelector(`.popup__features`);
    const featuresFragment = document.createDocumentFragment();
    cardFeatures.innerHTML = ``;

    window.data.advertisements[0].offer.features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.classList.add(`popup__feature`);
      switch (feature) {
        case `wifi`:
          featureElement.classList.add(`popup__feature--wifi`);
          break;

        case `dishwasher`:
          featureElement.classList.add(`popup__feature--dishwasher`);
          break;

        case `parking`:
          featureElement.classList.add(`popup__feature--parking`);
          break;

        case `washer`:
          featureElement.classList.add(`popup__feature--washer`);
          break;

        case `elevator`:
          featureElement.classList.add(`popup__feature--elevator`);
          break;

        case `conditioner`:
          featureElement.classList.add(`popup__feature--conditioner`);
          break;
      }
      featuresFragment.appendChild(featureElement);
    });

    cardFeatures.appendChild(featuresFragment);

    const cardPictures = cardElement.querySelector(`.popup__photos`);
    cardPictures.innerHTML = ``;
    const picturesFragment = document.createDocumentFragment();

    window.data.advertisements[0].offer.photos.forEach((photo) => {
      const pictureElement = document.createElement(`img`);
      pictureElement.classList.add(`popup__photo`);
      pictureElement.width = 45;
      pictureElement.height = 40;
      pictureElement.alt = `Фотография жилья`;
      pictureElement.src = photo;
      picturesFragment.appendChild(pictureElement);
    });

    const closeButton = cardElement.querySelector(`.popup__close`);
    closeButton.addEventListener(`mousedown`, () => {
      closeCard(cardElement);
    });

    document.addEventListener(`keydown`, onEscClose);

    cardPictures.appendChild(picturesFragment);
    window.map.mapElement.appendChild(cardElement);
  };

  window.card = {
    cardTemplate,
    openCard,
    onEscClose,
    closeCard,
    createCard,
  };
})();
