const editPopup = document.getElementById('editPopup');
const addPopup = document.getElementById('addPopup');
const imgPopup =  document.getElementById('imgPopup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonEdit = document.getElementById('closeEditPopup');
const closeButtonAdd = document.getElementById('closeAddPopup');
const likeButton = document.querySelector('.gallery__button-like');
const galleryList = document.querySelector('.gallery__list');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__nameInput');
const jobInput = editForm.querySelector('.popup__jobInput');
const galleryTemplate = document.querySelector('#gallery').content;
const addForm = addPopup.querySelector('.popup__form');
const closeBtns = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileSubline = document.querySelector('.profile__subline');
const nameCard = addForm.querySelector('[name="name"]');
const urlCardImg = addForm.querySelector('[name="subline"]');


//Функция отрытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

//Открытие попапа с изображением
function handlePreviewPicture(data) {
  imgPopup.querySelector('.popup__img').setAttribute('src', data.link);
  imgPopup.querySelector('.popup__img').setAttribute('alt', data.name);
  imgPopup.querySelector('.popup__subtitle').textContent = data.name;
  openPopup(imgPopup);
}

//Установка слушателей на кнопки открытия попапов
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  openPopup(editPopup);
});



//Функция закрытия попапа
closeBtns.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')));
});
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};


//Функциональность кнопки "Сохранить"
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubline.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
};
editForm.addEventListener('submit', handleProfileFormSubmit);

//Функция создания карточки
function createCard(cardData) {
  const card = galleryTemplate.querySelector('.gallery__item').cloneNode(true);
  const title = card.querySelector('.gallery__title');
  title.textContent = cardData.name;
  const elementImage = card.querySelector('.gallery__img');
  elementImage.setAttribute('src', cardData.link);
  elementImage.setAttribute('alt', cardData.name);
  elementImage.addEventListener('click', () =>
    handlePreviewPicture(cardData)
  );
  card.querySelector('.gallery__button-like').addEventListener('click',
  function(evt) {
    evt.target.classList.toggle('gallery__button-like_active');
  });
  card.querySelector('.gallery__button-delete').addEventListener('click',
  function(evt1) {
    evt1.target.closest('li').remove();
  });
  return card;
}

//Функция добавления карточки на страницу
function addCard (cardData, cardContainer) {
  const card = createCard(cardData);
  cardContainer.prepend(card);
};

//Фунция добавления карточки пользователя
function addUserCard (evt) {
  evt.preventDefault();
  closePopup(evt.target.closest('.popup'));
  addCard({
    name: nameCard.value,
    link: urlCardImg.value
  }, galleryList);
  addForm.reset();
}

//Добавление слушателя кнопке Добавить
addForm.addEventListener('submit', (evt) => addUserCard (evt));

//Карточки из коробки
initialCards.forEach ((item) => {
  addCard(item, galleryList);
});
