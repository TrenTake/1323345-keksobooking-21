'use strict';

(() => {
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;

  const load = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(`Внезапная ошибка`, `Статус ответа: ` + xhr.status);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;

    xhr.open(`GET`, URL_GET);
    xhr.send();
  };

  const upload = (data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(`При отправке данных произошла ошибка.`, `Статус ответа: ` + xhr.status);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  };


  window.loadUnload = {
    load,
    upload,
  };
})();
