const cardTemplateContent = document.querySelector('#card-template').content;

const cardElement = cardTemplateContent.querySelector('.card');

const cardsContainer = document.querySelector('.places__list');

function createCard (cardTemplateContent, deleteCard, cardData) {
  const cardElement = cardTemplateContent.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', deleteCard);
  return cardElement;
};

function deleteCard(evt) {
  const clickedDeleteButton = evt.currentTarget;
  const cardToRemove = clickedDeleteButton.closest('.card');
  cardToRemove.remove();
}

initialCards.forEach(cardData => {
  const newCard = createCard (cardTemplateContent, deleteCard, cardData);
  cardsContainer.appendChild(newCard);
});