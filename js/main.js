'use strict';
const featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photosArr = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const createFeaturesArr = () => {
  const randomFeatures = featuresArr.slice();
  shuffle(randomFeatures);
  randomFeatures.slice(0, getRandomInt(randomFeatures.length));
}

const createPhotosArr = () => {
  const randomPhotos = photosArr.slice();
  shuffle(randomPhotos);
  randomPhotos.slice(0, getRandomInt(randomPhotos.length));
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const createAdv = () => {
  const avatarNumber = getRandomInt(1, 8);
  const title = "";
  const locationArr = [location.x, location.y];
  const price = 10000;
  const houseType = ["palace", "flat", "house", "bungalow"];
  const roomsAmount = 0;
  const guestsAmount = 0;
  const checkinTime = ["12:00", "13:00", "14:00"];
  const checkoutTime = ["12:00", "13:00", "14:00"];
  const description = "";

  return {
    author: {
      avatar: "img/avatars/user0" + avatarNumber + ".png"
    },
    offer: {
        title: title,
        address: locationArr,
        price: price,
        type: houseType[getRandomInt(0, houseType.length)],
        rooms: roomsAmount,
        guests: guestsAmount,
        checkin: checkinTime[getRandomInt(0, checkinTime.length)],
        checkout: checkoutTime[getRandomInt(0, checkoutTime.length)],
        features: createFeaturesArr(),
        description: description,
        photos: createPhotosArr(),
    },
    location: {
        x: getRandomInt(0, 1200),
        y: getRandomInt(130, 630),
    }
  }
}

const blockMap = document.querySelector('.map');
const pinTemplate = document.querySelector('#pin');
const clonePinTemplate = pinTemplate.cloneNode(true);
blockMap.classList.remove('map--faded');
createAdv();
createFeaturesArr();
createPhotosArr();
