const editPopup = document.getElementById('editPopup');
const addPopup = document.getElementById('addPopup');
const imgPopup =  document.getElementById('imgPopup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonEdit = document.getElementById('closeEditPopup');
const closeButtonAdd = document.getElementById('closeAddPopup');
const likeButton = document.querySelector('.gallery__button-like');
const galleryList = document.querySelector('.gallery__list');
const formElement = editPopup.querySelector('.profile-form');
const nameInput = formElement.querySelector('.popup__nameInput');
const jobInput = formElement.querySelector('.popup__jobInput');
const galleryTemplate = document.querySelector('#gallery').content;
const addForm = addPopup.querySelector('.profile-form');


const initialCards = [
  {
    name: 'Гора Эльбрус',
    link: './images/Elbrus.jpg'
  },
  {
    name: 'Заповедник Столбы',
    link: './images/ZapStolbu.jpg'
  },
  {
    name: 'Озеро Байкал',
    link: './images/Ozero-Bajkal.jpg'
  },
  {
    name: 'Озеро Кезеной-ам',
    link: './images/OzKezenoi-am.jpg'
  },
  {
    name: 'Ласточкино гнездо',
    link: './images/LastGnezdo.jpg'
  },
  {
    name: 'Чарские пески',
    link: './images/ZharskiePeski.jpg'
  }
];

//Функция отрытия попапа
function openPopup (popup, src, subline,) {
  popup.classList.add('popup_opened')
  if (popup === editPopup) {
    let name = editPopup.querySelector('input[name=name]');
    name.value = document.querySelector('.profile__name').textContent;
    let subline = editPopup.querySelector('input[name=subline]');
    subline.value = document.querySelector('.profile__subline').textContent;
  }
  if (popup === imgPopup) {
    imgPopup.querySelector('.popup__img').setAttribute('src', src);
    imgPopup.querySelector('.popup__img').setAttribute('alt', subline);
    imgPopup.querySelector('.popup__subtitle').textContent = subline;
  }
}

//Установка слушателей на кнопки открытия попапов
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});
editButton.addEventListener('click', function () {
  openPopup(editPopup);
});



//Функция закрытия попапа
const closeBtns = document.querySelectorAll('.popup__close-button');
for (i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener('click', (evt) => closePopup(evt.target));
}
function closePopup (popup) {
  popup.closest('.popup').classList.remove('popup_opened')
}


//Функциональность кнопки "Сохранить"
function formSubmitHandler (evt) {
  evt.preventDefault();
  const profileName = document.querySelector('.profile__name');
  const profileSubline = document.querySelector('.profile__subline');
  profileName.textContent = nameInput.value;
  profileSubline.textContent = jobInput.value;
  evt.target.closest('.popup').classList.remove('popup_opened')
}
formElement.addEventListener('submit', formSubmitHandler);

//Функция создания карточки
function createCard(cardData) {
  const card = galleryTemplate.querySelector('.gallery__item').cloneNode(true);
  const title = card.querySelector('.gallery__title');
  title.textContent = cardData.name;
  const elementImage = card.querySelector('.gallery__img');
  elementImage.setAttribute('src', cardData.link);
  elementImage.setAttribute('alt', cardData.name);
  elementImage.addEventListener('click', () =>
    openPopup(imgPopup, cardData.link, cardData.name)
  );
  card.querySelector('.gallery__button-like').addEventListener('click',
  function(evt) {
    evt.target.classList.toggle('gallery__button-like_active');
  });
  card.querySelector('.gallery__button-delete').addEventListener('click',
  function(evt1) {
    evt1.target.closest('li').remove();
  });
  return card
}

//Функция добавления карточки на страницу
function addCard (cardData, cardContainer) {
  const card = createCard(cardData);
  cardContainer.prepend(card);
}

//Фунция добавления карточки пользователя
addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  closePopup(evt.target);
  addCard({
    name: addForm.querySelector('[name="name"]').value,
    link: addForm.querySelector('[name="subline"]').value
  }, galleryList);
})

//Карточки из коробки
initialCards.forEach ((item) => {
  addCard(item, galleryList)
})
