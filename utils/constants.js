module.exports = Object.freeze({
  HTTP_PERMISSION_DENIED: '403',
  HTTP_BAD_REQUEST: '400',
  HTTP_INTERNAL_SERVER_ERROR: '500',
  HTTP_NOT_FOUND: '404',
  JWT_PROBLEM: 'Некорректный JWT токен',
  OWNER_WRONG: 'Вы не являетесь владельцем карточки',
  CARD_NOT_EXIST: 'Нет такой карточки',
  USER_NOT_FOUND: 'Пользователь не найден',
  CARD_NOT_FOUND: 'Карточка не найдена',
  USER_BAD_DATA: 'Переданы некорректные данные в метод пользователя',
  SERVER_ERROR: 'Произошла ошибка на сервере',
  USER_CREATE_BAD_DATA: 'Переданы некорректные данные в метод создания пользователя',
  USER_AVA_BAD_DATA: 'Переданы некорректные данные в метод обновления аватара пользователя',
  USER_UPDATE_BAD_DATA: 'Переданы некорректные данные в метод обновления профиля',
  CARD_CREATE_BAD_DATA: 'переданы некорректные данные в метод создания карточки',
  CARD_DELETE_BAD_DATA: 'переданы некорректные данные в метод удаления карточки',
  CARD_LIKE_BAD_DATA: 'переданы некорректные данные в метод лайка карточки',
  CARD_DISLIKE_BAD_DATA: 'переданы некорректные данные в метод дизлайка карточки',
  PAGE_NOT_FOUND: 'Уууупс! Нет такой страницы... Штож',
});
