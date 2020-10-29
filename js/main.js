'use strict';
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const HEIGHT_PIN = 40;
const WIDTH_PIN = 40;

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
mapElement.classList.remove(`map--faded`);

const advertisements = [];
for (let i = 0; i < 8; i++) {
  const advertisement = createAdvertisement();
  advertisements.push(advertisement);
}

const fragment = document.createDocumentFragment();

advertisements.forEach((advertisement) => {
  const pin = pinTemplate.cloneNode(true).content.querySelector(`.map__pin`);

  pin.style.top = (advertisement.location.y - HEIGHT_PIN) + `px`;
  pin.style.left = (advertisement.location.x - WIDTH_PIN / 2) + `px`;
  const imgElement = pin.querySelector(`img`);
  imgElement.src = advertisement.author.avatar;
  fragment.appendChild(pin);
});

const blockMap = document.querySelector(`.map__pins`);
blockMap.appendChild(fragment);

const cardTemplate = document.querySelector(`#card`);
const cardElement = cardTemplate.cloneNode(true).content.querySelector(`.map__card`);

const createCard = () => {
  const titleElement = cardElement.querySelector(`.popup__title`);
  titleElement.textContent = advertisements[0].offer.title;
  const addressElement = cardElement.querySelector(`.popup__text--address`);
  addressElement.textContent = advertisements[0].offer.address;
  const priceElement = cardElement.querySelector(`.popup__text--price`);
  priceElement.textContent = advertisements[0].offer.price + `₽/ночь`;
  const typeElemennt = cardElement.querySelector(`.popup__type`);
  typeElemennt.textContent = advertisements[0].offer.type;
  const roomElement = cardElement.querySelector(`.popup__text--capacity`);
  roomElement.textContent = advertisements[0].offer.rooms + `комнаты для` + advertisements[0].offer.guests + `гостей`;
  const checkinElement = cardElement.querySelector(`.popup__text--time`);
  checkinElement.textContent = `Заезд после ` + advertisements[0].offer.checkin + `, выезд до ` + advertisements[0].offer.checkout;
  const avatarElement = cardElement.querySelector(`.popup__avatar`);
  avatarElement.src = advertisements[0].author.avatar;

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

  cardPictures.appendChild(picturesFragment);
};


mapElement.appendChild(cardElement);
createCard();
