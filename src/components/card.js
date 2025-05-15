
import { initialCards } from './cards.js';
import { closeModal } from './modal.js';
import { buildCardElement, cardTemplateContent, openImage, cardsContainer } from '../index.js';

export function createNewСard(event, nameInput, urlInput, popupElement) {
  event.preventDefault();
  const valueNameCardInput = nameInput.value;
  const valueUrlInput = urlInput.value;

  const newCardData = {
    name: valueNameCardInput,
    link: valueUrlInput
  };

  initialCards.unshift(newCardData);

  const cardElement = buildCardElement(cardTemplateContent, deleteCard, likeCard, openImage, newCardData);

  cardsContainer.prepend(cardElement);

  closeModal(popupElement);
  nameInput.value = '';
  urlInput.value = '';
}

export function deleteCard(event) {
  const clickedDeleteButton = event.currentTarget;
  const cardToRemove = clickedDeleteButton.closest('.card');
  cardToRemove.remove();
}

export function likeCard(event) {
  event.target.classList.add('card__like-button_is-active');
}
