
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { buildCardElement, deleteCard, likeCard } from './components/card.js';



const cardTemplateContent = document.querySelector('#card-template').content;
const cardElement = cardTemplateContent.querySelector('.card');
const cardsContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

const popupFormTypeEdit = popupTypeEdit.querySelector('.popup__content .popup__form');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileInfo = document.querySelector('.content .profile .profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');

const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const nameCardInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const urlCardInput = popupTypeNewCard.querySelector('.popup__input_type_url');
const popupFormTypeNewCard = popupTypeNewCard.querySelector('.popup__content .popup__form');



function createNewСard(event, nameInput, urlInput, popupElement) {
  event.preventDefault();
  const valueNameCardInput = nameInput.value;
  const valueUrlInput = urlInput.value;

  const newCardData = {
    name: valueNameCardInput,
    link: valueUrlInput
  };

  const cardElement = buildCardElement(cardTemplateContent, deleteCard, likeCard, openImage, newCardData);
  cardsContainer.prepend(cardElement);

  closeModal(popupElement);
  event.target.reset();
}

function appendCard(cardData) {
  const newCard = buildCardElement(cardTemplateContent, deleteCard, likeCard, openImage, cardData);
  cardsContainer.appendChild(newCard);
}

initialCards.forEach(appendCard);

function openImage(event) {
  const clickedCard = event.currentTarget;
  const imageUrl = clickedCard.src;
  const imageAlt = clickedCard.alt;

  popupImage.src = imageUrl;
  popupImage.alt = imageAlt;
  popupTypeImageCaption.textContent = imageAlt;

  openModal(popupTypeImage);
}

function handleSubmitTypeEdit(event, popupElement, inputName, inputJob, title, description) {
  event.preventDefault();

  const valueNameInput = inputName.value;
  const valueJobInput = inputJob.value;
  title.textContent = valueNameInput;
  description.textContent = valueJobInput;

  closeModal(popupElement);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
}



profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));

popupFormTypeEdit.addEventListener('submit', (event) => {
  handleSubmitTypeEdit(event, popupTypeEdit, nameInput, jobInput, profileTitle, profileDescription);
});

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

popupFormTypeNewCard.addEventListener('submit', (event) => {
  createNewСard(event, nameCardInput, urlCardInput, popupTypeNewCard);
});
