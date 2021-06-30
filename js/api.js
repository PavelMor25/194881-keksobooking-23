const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((responce) => (responce.ok) ? responce.json() : onFail('Не удалось загрузить данные'))
    .then((ad) => {
      onSuccess(ad);
    });
};

export {getData};
