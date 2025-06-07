
import { profileTitle, profileDescription, profileImage, appendCard } from '../index';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '7511d042-2c18-453e-9104-64856fb3c6e1',
    'Content-Type': 'application/json'
  }
};

function handleResponse(res) {
   if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const fetchUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse);
};

export const fetchInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse);
};

export const updateProfileOnServer = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then(handleResponse);
};

export const getProfileFromServer = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse);
};

export const addNewCard = (nameCard, srcCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ 
      name: nameCard,
      link: srcCard
    })
  })
  .then(handleResponse);
};

export const getCardFromServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse);
};

export const handleDeleteCardClick = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse);
};

export const addLike = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse);
};

export const removeLike = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }) 
  .then(handleResponse);
};

export const updateProfileAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatar })
  })
  .then(handleResponse);
};

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
