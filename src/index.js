
// Импорты
import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { buildCardElement, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import { 
  fetchUserData, 
  fetchInitialCards, 
  updateProfileOnServer, 
  addNewCard, 
  handleDeleteCardClick, 
  removeLike, 
  addLike,
  updateProfileAvatar
} from './components/api.js';

// Объявление констант
const cardTemplateContent = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupFormTypeEdit = popupTypeEdit.querySelector('.popup__content .popup__form');

const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');

const profileInfo = document.querySelector('.content .profile .profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileImage = document.querySelector('.content .profile .profile__image');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');

const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupFormTypeNewCard = popupTypeNewCard.querySelector('.popup__content .popup__form');

const nameCardInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const urlCardInput = popupTypeNewCard.querySelector('.popup__input_type_url');

const closeButtons = document.querySelectorAll('.popup__close');

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupFormTypeAvatar = popupTypeAvatar.querySelector('.popup__content .popup__form');

const urlInput = popupFormTypeAvatar.querySelector('.popup__input_type_url');

// Валидация форм
enableValidation(validationConfig);

// Массив информации о пользователе и карточек
Promise.all([fetchUserData(), fetchInitialCards()])
  .then(([userData, initialCardsFetch]) => {
    console.log(userData);
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    console.log(userData.avatar);
    console.log(profileImage.src);

    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    const meId = userData._id

    console.log(initialCardsFetch);
    initialCardsFetch.forEach(card => appendCard(card, meId));
});

// Заполнение информации пользователя
async function handleSubmitTypeEdit(event) {
  event.preventDefault();
  
  const submitButton = event.submitter;
  const valueNameInput = nameInput.value;
  const valueJobInput = jobInput.value;

  try {
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    const updatedData = await updateProfileOnServer(valueNameInput, valueJobInput);
    const serverData = await fetchUserData();

    profileTitle.textContent = serverData.name || valueNameInput;
    profileDescription.textContent = serverData.about || valueJobInput;

    nameInput.value = serverData.name || valueNameInput;
    jobInput.value = serverData.about || valueJobInput;

    closeModal(popupTypeEdit);

    console.log('Данные успешно обновлены:', serverData);

  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
  } finally {
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
  }
}

// Смена аватара
async function handleSubmitTypeAvatar(event, popupElement, inputURL, profileImage) {
  event.preventDefault();
  
  const submitButton = event.submitter;
  const valueUrlInput = inputURL.value;

  try {
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    await updateProfileAvatar(valueUrlInput);
    
    profileImage.style.backgroundImage = `url(${valueUrlInput})`;
    
    closeModal(popupElement);
    
  } catch (error) {
    console.error('Ошибка при обновлении аватара:', error);
    
  } finally {
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
  }
}

// Создание карточки
async function createNewСard(event, nameInput, urlInput, popupElement) {
  event.preventDefault();

  const submitButton = event.submitter;
  const valueNameCardInput = nameInput.value;
  const valueUrlInput = urlInput.value;
  const meId = false;

  try {
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    const response = await addNewCard(valueNameCardInput, valueUrlInput);

    const newCardData = {
      name: valueNameCardInput,
      link: valueUrlInput,
      likes: [],
      _id: response._id
    };
  
    const cardElement = buildCardElement(cardTemplateContent, deleteCard, handleDeleteCardClick, likeCard, removeLike, addLike, openImage, newCardData, meId);
    cardsContainer.prepend(cardElement);

    closeModal(popupElement);
    event.target.reset();

  } catch (error) {
    console.error('Ошибка при обновлении аватара:', error);
    
  } finally {
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
  }
}

// Добавление карточки на страницу
function appendCard(cardData, meId) {
  const newCard = buildCardElement(cardTemplateContent, deleteCard, handleDeleteCardClick, likeCard, removeLike, addLike, openImage, cardData, meId);
  cardsContainer.appendChild(newCard);
}

// Открытие попапа профиля
profileEditButton.addEventListener('click', () => {
  fillProfileForm(nameInput, jobInput);
  clearValidation(popupFormTypeEdit, validationConfig);
  openModal(popupTypeEdit);
});

// Автоматическое заполнение попапа профиля
function fillProfileForm(inputName, inputJob) {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
}

// Открытие попапа обновления аватара
profileImage.addEventListener('click', () => {
  popupFormTypeAvatar.reset();
  clearValidation(popupFormTypeAvatar, validationConfig);
  openModal(popupTypeAvatar);
});

// Открытие попапа добавления карточки
profileAddButton.addEventListener('click', () => {
  popupFormTypeNewCard.reset();
  clearValidation(popupFormTypeNewCard, validationConfig);
  openModal(popupTypeNewCard);
});

// Открытие попапа картинки
function openImage(event) {
  const clickedCard = event.currentTarget;
  const imageUrl = clickedCard.src;
  const imageAlt = clickedCard.alt;

  popupImage.src = imageUrl;
  popupImage.alt = imageAlt;
  popupTypeImageCaption.textContent = imageAlt;

  openModal(popupTypeImage);
}

// Закрытие любой формы по кнопке в попапе
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

// Клик по оверлею
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

// Закрытие всех модальных окон по оверлею
popupTypeEdit.addEventListener('click', handleOverlayClick);
popupTypeImage.addEventListener('click', handleOverlayClick);
popupTypeNewCard.addEventListener('click', handleOverlayClick);
popupTypeAvatar.addEventListener('click', handleOverlayClick);

// Отправка формы информации о пользователе
popupFormTypeEdit.addEventListener('submit', (event) => {
  handleSubmitTypeEdit(event);
});

// Отправка формы новой карточки
popupFormTypeNewCard.addEventListener('submit', (event) => {
  createNewСard(event, nameCardInput, urlCardInput, popupTypeNewCard);
});

// Обновление аватара
popupFormTypeAvatar.addEventListener('submit', (event) => {
  handleSubmitTypeAvatar(event, popupTypeAvatar, urlInput, profileImage);
});
