'use strict';
const featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // подробнее о нём - в следующих главах
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const createAdv = () => {
  const avatarNumber = 0;
  const title = "";
  const locationArr = [location.x, location.y];
  const price = 10000;
  const houseType = ["palace", "flat", "house", "bungalow"];
  const roomsAmount = 0;
  const guestsAmount = 0;
  const checkinTime = ["12:00", "13:00", "14:00"];
  const checkoutTime = ["12:00", "13:00", "14:00"];
  const createFeaturesArr = () => {
    const randomFeatures = featuresArr.slice();
    shuffle(randomFeatures);
    console.log(randomFeatures);
  }
  const description = "";

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

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
//        features: массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        description: description,
//        photos: массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    location: {
        x: getRandomInt(0, 1200),
        y: getRandomInt(130, 630),
    }
  }
}

const blockMap = document.querySelector('.map');
blockMap.classList.remove('map--faded');
createAdv();
