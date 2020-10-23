'use strict';
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const HEIGHT_PIN = 40;
const WEIGHT_PIN = 40;

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
  randomFeatures.slice(0, getRandomInt(randomFeatures.length));
};

const createPhotos = () => {
  const randomPhotos = photos.slice();
  shuffle(randomPhotos);
  randomPhotos.slice(0, getRandomInt(randomPhotos.length));
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

const createAdvertisement = () => {
  const avatarNumber = getRandomInt(1, 8);
  const titleValue = ``;
  const locationValue = [location.x, location.y];
  const priceValue = 10000;
  const houseType = [`palace`, `flat`, `house`, `bungalow`];
  const roomsAmount = 0;
  const guestsAmount = 0;
  const checkinTime = [`12:00`, `13:00`, `14:00`];
  const checkoutTime = [`12:00`, `13:00`, `14:00`];
  const descriptionValue = ``;

  return {
    author: {
      avatar: `img/avatars/user0` + avatarNumber + `.png`
    },
    offer: {
      title: titleValue,
      address: locationValue,
      price: priceValue,
      type: houseType[getRandomInt(0, houseType.length)],
      rooms: roomsAmount,
      guests: guestsAmount,
      checkin: checkinTime[getRandomInt(0, checkinTime.length)],
      checkout: checkoutTime[getRandomInt(0, checkoutTime.length)],
      features: createFeatures(),
      description: descriptionValue,
      photos: createPhotos(),
    },
    location: {
      x: getRandomInt(0, 1200),
      y: getRandomInt(130, 630),
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
  pin.style.left = (advertisement.location.x - WEIGHT_PIN / 2) + `px`;
  const imgElement = pin.querySelector(`img`);
  imgElement.src = advertisement.author.avatar;
  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardElement = cardTemplate.cloneNode(true);
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
  checkinElement.textContent = `заезд после ` + advertisement.offer.checkin + `, выезд до ` + advertisement.offer.checkout;
  fragment.appendChild(pin);
});

const blockMap = document.querySelector(`.map__pins`);
blockMap.appendChild(fragment);
