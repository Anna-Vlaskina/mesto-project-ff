
export function buildCardElement(cardTemplateContent, deleteCard, handleDeleteCardClick, likeCard, removeLike, addLike, openImage, cardData, meId) {
  const cardElement = cardTemplateContent.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const likesCountElement = cardElement.querySelector('.card__likes-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.setAttribute('data-card-id', cardData._id);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  const likes = cardData.likes.length;
    
  if (likesCountElement) {
    likesCountElement.textContent = likes;
  }

  if (meId !== false) {
    const ownerId = cardData.owner._id;
    if (meId !== ownerId) {
      buttonDelete.classList.toggle('card__delete-button-hide');
    }
  }

  const likesData = cardData.likes;

  if (likesData.some(user => user._id === meId)) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }

  buttonDelete.addEventListener('click', (event) => {
    deleteCard(event, handleDeleteCardClick);
  });

  cardLikeButton.addEventListener('click', (event) => {
    likeCard(event, removeLike, addLike);
  });
  cardImage.addEventListener('click', openImage);

  return cardElement;
};

export function deleteCard(event, handleDeleteCardClick) {
  const clickedDeleteButton = event.currentTarget;
  const cardToRemove = clickedDeleteButton.closest('.card');
  
  handleDeleteCardClick(cardToRemove.dataset.cardId)
    .then(() => {
      cardToRemove.remove();
    })
    .catch(error => {
      console.error('Ошибка при удалении карточки:', error);
    });
}

export function likeCard(event, removeLike, addLike) {
  const clickedLikeButton = event.currentTarget;
  const card = clickedLikeButton.closest('.card');
  const likesCountElement = card.querySelector('.card__likes-count');
  const likeButton = event.target;

  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    removeLike(card.dataset.cardId)
      .then(cardData => {
        likeButton.classList.remove('card__like-button_is-active');
        const likesCount = cardData.likes.length;
        likesCountElement.textContent = likesCount;
      })
      .catch(error => {
        console.error('Ошибка при удалении лайка:', error);
      });
  } else {
    addLike(card.dataset.cardId)
      .then(cardData => {
        likeButton.classList.add('card__like-button_is-active');
        const likesCount = cardData.likes.length;
        likesCountElement.textContent = likesCount;
      })
      .catch(error => {
        console.error('Ошибка при добавлении лайка:', error);
      });
  }
}
