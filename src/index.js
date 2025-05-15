
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { createNewСard, deleteCard, likeCard } from './components/card.js';



export const cardTemplateContent = document.querySelector('#card-template').content;
export const cardsContainer = document.querySelector('.places__list');
const cardElement = cardTemplateContent.querySelector('.card');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

const popupFormTypeEdit = popupTypeEdit.querySelector('.popup__content .popup__form');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileInfo = document.querySelector('.content .profile .profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const nameCardInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const urlCardInput = popupTypeNewCard.querySelector('.popup__input_type_url');
const popupFormTypeNewCard = popupTypeNewCard.querySelector('.popup__content .popup__form');



export function buildCardElement(cardTemplateContent, deleteCard, likeCard, openImage, cardData) {
  const cardElement = cardTemplateContent.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  buttonDelete.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openImage);

  return cardElement;
};

function appendCard(cardData) {
  const newCard = buildCardElement(cardTemplateContent, deleteCard, likeCard, openImage, cardData);
  cardsContainer.appendChild(newCard);
}

initialCards.forEach(appendCard);

export function openImage(event) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  const clickedCard = event.currentTarget;
  const imageUrl = clickedCard.src;
  const imageAlt = clickedCard.alt;

  popupImage.src = imageUrl;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openModal(popupTypeImage);
}

function handleSubmit(event, popupElement, inputName, inputJob, title, description) {
  event.preventDefault();

  const valueNameInput = inputName.value;
  const valueJobInput = inputJob.value;
  title.textContent = valueNameInput;
  description.textContent = valueJobInput;

  closeModal(popupElement);
  inputName.value = '';
  inputJob.value = '';
}



profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));

popupFormTypeEdit.addEventListener('submit', (event) => {
  handleSubmit(event, popupTypeEdit, nameInput, jobInput, profileTitle, profileDescription);
});

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

popupFormTypeNewCard.addEventListener('submit', (event) => {
  createNewСard(event, nameCardInput, urlCardInput, popupTypeNewCard);
});