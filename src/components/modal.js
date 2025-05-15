
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened', 'popup_is-animated');
  popupElement.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscapeKey);

  const closeButton = popupElement.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(popupElement));
  }
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  popupElement.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscapeKey);

  const closeButton = popupElement.querySelector('.popup__close');
  if (closeButton) {
    closeButton.removeEventListener('click', () => closeModal(popupElement));
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
