'use strict';

(() => {
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

  const advertisements = [];
  for (let i = 0; i < 8; i++) {
    const advertisement = createAdvertisement();
    advertisements.push(advertisement);
  }

  window.data = {
    features,
    photos,
    HEIGHT_PIN,
    WIDTH_PIN,
    minPrice,
    shuffle,
    createFeatures,
    createPhotos,
    getRandomInt,
    createAdvertisement,
    advertisements,
  };
})();