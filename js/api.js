const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((responce) => (responce.ok) ? responce.json() : onFail('Не удалось загрузить данные'))
    .then((ad) => {
      onSuccess(ad);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
