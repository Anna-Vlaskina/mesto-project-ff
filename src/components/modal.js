
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', handleEscapeKey);
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
