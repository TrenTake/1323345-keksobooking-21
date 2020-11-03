'use strict';
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const HEIGHT_PIN = 40;
const WIDTH_PIN = 40;

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const appConfig = {
  isActive: false,
};

/**
  * Перемешивает массив
  * https://learn.javascript.ru/task/shuffle
*/

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const pinTemplate = document.querySelector(`#pin`);


const createFeatures = () => {
  const randomFeatures = features.slice();
  shuffle(randomFeatures);
  return randomFeatures.slice(0, getRandomInt(1, randomFeatures.length));
};

const createPhotos = () => {
  const randomPhotos = photos.slice();
  shuffle(randomPhotos);
  return randomPhotos.slice(0, getRandomInt(1, randomPhotos.length));
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

const createAdvertisement = () => {
  const avatarNumber = getRandomInt(1, 8);
  const titleValue = `Уютное гнездышко для молодоженов`;
  const locationX = getRandomInt(0, 1200);
  const locationY = getRandomInt(130, 630);
  const priceValue = getRandomInt(3500, 10000);
  const houseType = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
  const roomsAmount = getRandomInt(1, 4) + ` `;
  const guestsAmount = ` ` + getRandomInt(1, 6) + ` `;
  const checkinTime = [`12:00`, `13:00`, `14:00`];
  const checkoutTime = [`12:00`, `13:00`, `14:00`];
  const descriptionValue = ``;

  return {
    author: {
      avatar: `img/avatars/user0` + avatarNumber + `.png`
    },
    location: {
      x: locationX,
      y: locationY,
    },
    offer: {
      title: titleValue,
      address: locationX + `, ` + locationY,
      price: priceValue,
      type: houseType[getRandomInt(0, houseType.length - 1)],
      rooms: roomsAmount,
      guests: guestsAmount,
      checkin: checkinTime[getRandomInt(0, checkinTime.length - 1)],
      checkout: checkoutTime[getRandomInt(0, checkoutTime.length - 1)],
      features: createFeatures(),
      description: descriptionValue,
      photos: createPhotos(),
    }
  };
};

const mapElement = document.querySelector(`.map`);

const advertisements = [];
for (let i = 0; i < 8; i++) {
  const advertisement = createAdvertisement();
  advertisements.push(advertisement);
}

const fragment = document.createDocumentFragment();

const pinShow = () => {
  advertisements.forEach((advertisement) => {
    const pin = pinTemplate.cloneNode(true).content.querySelector(`.map__pin`);

    pin.style.top = (advertisement.location.y - HEIGHT_PIN) + `px`;
    pin.style.left = (advertisement.location.x - WIDTH_PIN / 2) + `px`;
    const imgElement = pin.querySelector(`img`);
    imgElement.src = advertisement.author.avatar;
    pin.addEventListener(`click`, () => {
      openCard(advertisement);
    });
    fragment.appendChild(pin);
  });

  const blockMap = document.querySelector(`.map__pins`);
  blockMap.appendChild(fragment);
};


const cardTemplate = document.querySelector(`#card`);

const openCard = (advertisement) => {
  const cardElement = document.querySelector(`article`);
  if (cardElement) {
    cardElement.remove();
    createCard(advertisement);
  } else {
    createCard(advertisement);
  }
};

const closeCard = (card) => {
  card.classList.add(`hidden`);
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

  advertisements[0].offer.features.forEach((feature) => {
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

  advertisements[0].offer.photos.forEach((photo) => {
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

  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 27) {
      closeCard(cardElement);
    }
  });

  cardPictures.appendChild(picturesFragment);
  mapElement.appendChild(cardElement);
};

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = document.querySelectorAll(`.ad-form__element`);

const activeApp = () => {
  mapElement.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  appConfig.isActive = true;
  setAddress();
  pinShow();

  for (const fieldset of adFormFieldsets) {
    fieldset.disabled = false;
  }
};

const disableApp = () => {
  mapElement.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);

  for (const fieldset of adFormFieldsets) {
    fieldset.disabled = true;
  }
};

const priceElement = document.querySelector(`#price`);
const typeHouseElement = document.querySelector(`#type`);

const setPrice = (type) => {
  priceElement.min = minPrice[type];
  priceElement.placeholder = minPrice[type];
};

const mainPinElement = document.querySelector(`.map__pin--main`);
const addressElement = document.querySelector(`#address`);
const setAddress = () => {
  const xCoords = mainPinElement.offsetLeft + mainPinElement.offsetWidth / 2;
  const yCoords = mainPinElement.offsetTop + mainPinElement.offsetHeight;
  addressElement.value = xCoords + `, ` + yCoords;
  if (appConfig.isActive === true) {
    const yCoordsActive = mainPinElement.offsetTop + mainPinElement.offsetHeight / 2;
    addressElement.value = xCoords + `, ` + yCoordsActive;
  }
};

const roomNumber = document.querySelector(`#room_number`);
const capacityElement = document.querySelector(`#capacity`);

const roomsAndGuests = () => {
  if (roomNumber.value < capacityElement.value) {
    const message = `Количество гостей не соответствует количеству комнат`;
    capacityElement.setCustomValidity(message);
  } else if ((roomNumber.value !== `100` && capacityElement.value === `0`) || (roomNumber.value === `100` && capacityElement.value !== `0`)) {
    const message = `100 комнат не для гостей`;
    capacityElement.setCustomValidity(message);
  } else {
    const message = ``;
    capacityElement.setCustomValidity(message);
  }
};

const timeInElement = document.querySelector(`#timein`);
const timeOutElement = document.querySelector(`#timeout`);

const setTimeInOut = (select, time) => {
  select.value = time;
};


disableApp();
setAddress();
roomsAndGuests();

mainPinElement.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    activeApp();
  }
});

mainPinElement.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === 13) {
    activeApp();
  }
});

typeHouseElement.addEventListener(`change`, (evt) => {
  setPrice(evt.target.value);
});

timeInElement.addEventListener(`change`, (evt) => {
  setTimeInOut(timeOutElement, evt.target.value);
});

timeOutElement.addEventListener(`change`, (evt) => {
  setTimeInOut(timeInElement, evt.target.value);
});
