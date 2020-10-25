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
  pin.style.left = (advertisement.location.x - WEIGHT_PIN / 2) + `px`;
  const imgElement = pin.querySelector(`img`);
  imgElement.src = advertisement.author.avatar;
  fragment.appendChild(pin);
});

const blockMap = document.querySelector(`.map__pins`);
blockMap.appendChild(fragment);

const cardTemplate = document.querySelector(`#card`);
const cardElement = cardTemplate.cloneNode(true).content.querySelector(`.map__card`);

const createCard = () => {
  const advertisements = createAdvertisement();
  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  const titleElement = cardElement.querySelector(`.popup__title`);
  titleElement.textContent = advertisements.offer.title;
  const addressElement = cardElement.querySelector(`.popup__text--address`);
  addressElement.textContent = advertisements.offer.address;
  const priceElement = cardElement.querySelector(`.popup__text--price`);
  priceElement.textContent = advertisements.offer.price + `₽/ночь`;
  const typeElemennt = cardElement.querySelector(`.popup__type`);
  typeElemennt.textContent = advertisements.offer.type;
  const roomElement = cardElement.querySelector(`.popup__text--capacity`);
  roomElement.textContent = advertisements.offer.rooms + `комнаты для` + advertisements.offer.guests + `гостей`;
  const checkinElement = cardElement.querySelector(`.popup__text--time`);
  checkinElement.textContent = `Заезд после ` + advertisements.offer.checkin + `, выезд до ` + advertisements.offer.checkout;

  const cardFeatures = cardElement.querySelector(`.popup__features`);
  const featuresFragment = document.createDocumentFragment();
  cardFeatures.innerHTML = ``;

  advertisements.forEach((advertisement) => {
    const featureElement = document.createElement(`li`);
    featuresFragment.appendChild(featureElement);
  });
debugger;
  cardFeatures.appendChild(featuresFragment);
  const cardPictures = cardElement.querySelector(`.popup__photos`);
  cardPictures.innerHTML = ``;

};

mapElement.appendChild(cardElement);
