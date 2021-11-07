import { getLocalStorage, setLocalStorage } from './localStorage';
import { currentLanguage } from './settings';
import translate from './translate';
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

let currentDate;
const options = {
  month: 'long',
  weekday: 'long',
  day: '2-digit',
};

export function showDate() {
  const lang = currentLanguage == 'EN' ? 'en-US' : 'ru-RU';
  currentDate = new Date();
  date.textContent = currentDate.toLocaleDateString(`${lang}`, options);
}
export function timeOfDay() {
  const hours = new Date().getHours();
  let timeOfDay = '';
  if (hours >= 0 && hours < 6) timeOfDay = 'night';
  else if (hours >= 6 && hours < 12) timeOfDay = 'morning';
  else if (hours >= 12 && hours < 18) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';
  return timeOfDay;
}

export function showGreeting() {
  name.placeholder =
    currentLanguage == 'RU' ? translate('[Enter name]') : '[Enter name]';

  const wish = 'Good';
  let greeting = `${wish} ${timeOfDay()}`;
  if (currentLanguage == 'RU') {
    greeting = translate(greeting);
  }
  return greeting + ',';
}

export default function displayTime() {
  function showTime() {
    time.textContent = new Date().toLocaleTimeString();
    showDate();
    greeting.textContent = showGreeting();
    setTimeout(showTime, 1000);
  }

  function showDate() {
    const lang = currentLanguage == 'EN' ? 'en-US' : 'ru-RU';
    currentDate = new Date();
    date.textContent = currentDate.toLocaleDateString(`${lang}`, options);
  }

  function setEvents() {
    window.addEventListener('load', () => {
      getLocalStorage('name', name);
    });
    window.addEventListener('beforeunload', () => {
      setLocalStorage('name', name);
    });
  }
  setEvents();
  showTime();
}
