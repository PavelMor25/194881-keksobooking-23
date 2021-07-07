const inputAvatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const inputImages = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

inputAvatar.addEventListener('change', () => {
  const file = inputAvatar.files[0];

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    avatarPreview.src = reader.result;
  });

  reader.readAsDataURL(file);
});

inputImages.addEventListener('change', () => {
  const file = inputImages.files[0];

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const img = document.createElement('img');
    img.setAttribute('alt', 'Фотография объявления');
    img.setAttribute('width', '100%');
    img.setAttribute('height', '100%');
    img.src = reader.result;
    imagePreview.appendChild(img);
  });

  reader.readAsDataURL(file);
});
