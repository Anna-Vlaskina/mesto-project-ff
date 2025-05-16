
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

export function deleteCard(event) {
  const clickedDeleteButton = event.currentTarget;
  const cardToRemove = clickedDeleteButton.closest('.card');
  cardToRemove.remove();
}

export function likeCard(event) {
  event.target.classList.add('card__like-button_is-active');
}
