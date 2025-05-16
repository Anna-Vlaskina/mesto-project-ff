
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened', 'popup_is-animated');
  popupElement.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscapeKey);

  const closeButton = popupElement.querySelector('.popup__close');
  if (closeButton) {
    popupElement._closeButtonHandler = () => {
      closeModal(popupElement);
    };
    closeButton.addEventListener('click', popupElement._closeButtonHandler);
  }
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
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
