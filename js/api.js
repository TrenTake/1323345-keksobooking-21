'use strict';

(() => {
  const XHR_TIMEOUT = 10000;
  const SUCCESS_CODE = 200;

  const Url = {
    GET_ADVERTISEMENTS: `https://21.javascript.pages.academy/keksobooking/data`,
    POST_ADVERTISEMENT: `https://21.javascript.pages.academy/keksobooking`,
  };

  const Method = {
    GET: `GET`,
    POST: `POST`,
  };

  const getApi = (method, url, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = XHR_TIMEOUT;
    xhr.open(method, url);

    return xhr;
  };

  const loadAdvertisement = (onSuccess, onError) => {
    const api = getApi(Method.GET, Url.GET_ADVERTISEMENTS, onSuccess, onError);
    api.send();
  };

  const uploadAdvertisement = (data, onSuccess, onError) => {
    const api = getApi(Method.POST, Url.POST_ADVERTISEMENT, onSuccess, onError);
    api.send(data);
  };


  window.api = {
    loadAdvertisement,
    uploadAdvertisement,
  };
})();
