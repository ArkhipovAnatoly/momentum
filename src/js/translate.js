import i18next from 'i18next';

i18next.init({
  lng: 'ru',
  resources: {
    ru: {
      translation: {
        'Good morning': 'Доброе утро',
        'Good evening': 'Добрый вечер',
        'Good afternoon': 'Добрый день',
        'Good night': 'Доброй Ночи',
        '[Enter city]': '[Введите город]',
        '[Enter name]': '[Введите имя]',
        'm/s': 'м/с',
        'Wind speed': 'Скорость ветра',
        Humidity: 'Влажность',
        Settings: 'Настройки',
        General: 'Основные',
        Language: 'Язык приложения',
        Widgets: 'Виджеты',
        Greeting: 'Приветствие',
        'Image source': 'Источник картинок',
        'Image tag': 'Тэг картинки',
        Time: 'Время',
        Date: 'Дата',
        Quotes: 'Цитаты',
        Weather: 'Погода',
        'Audio player': 'Аудио плейер',
        'Extended player': 'Расширенный плейер',
      },
    },
  },
});

export default function translate(word) {
  return i18next.t(word);
}
