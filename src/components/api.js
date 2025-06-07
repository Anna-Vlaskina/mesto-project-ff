
import { profileTitle, profileDescription, profileImage, appendCard } from '../index';

export const fetchUserData = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
    method: 'GET',
    headers: {
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1'
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  });
};

export const fetchInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', {
    method: 'GET',
    headers: {
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1'
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  });
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

export const updateProfileOnServer = (name, about) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
};

export const getProfileFromServer = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
    method: 'GET',
    headers: {
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Данные успешно обновлены!');
      console.log(response.json());
      return response.json();
    } else {
      console.error('Ошибка при получении данных.');
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const addNewCard = (nameCard, srcCard) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', {
    method: 'POST',
    headers: {
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameCard,
      link: srcCard
    })
  })
};

export const getCardFromServer = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', {
    method: 'GET',
    headers: {
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Данные успешно обновлены!');
      return response.json();
    } else {
      console.error('Ошибка при получении данных.');
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const handleDeleteCardClick = (cardId) => { 
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/${cardId}`, { 
    method: 'DELETE', 
    headers: { 
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1' 
    } 
  }) 
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  });
};

export const addLike = (cardId) => { 
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, { 
    method: 'PUT', 
    headers: { 
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1' 
    } 
  }) 
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  });
};

export const removeLike = (cardId) => { 
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, { 
    method: 'DELETE', 
    headers: { 
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1' 
    } 
  }) 
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  });
};

export const updateProfileAvatar = (avatar) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '7511d042-2c18-453e-9104-64856fb3c6e1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(response => {
    if (response.ok) {
      console.log('Данные успешно обновлены!');
      console.log(response.json());
      return 
    } else {
      console.error('Ошибка при получении данных.');
    }
  })
  .catch((err) => {
    console.log(err);
  });
};
