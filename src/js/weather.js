import { getLocalStorage, setLocalStorage } from './localStorage';
import { currentLanguage } from './settings';
import translate from './translate';
const weatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const APIKEY = '17d7e0e78fdfb8ca45077c32ae936483';
let isFocused = false;
let data;
export let cityName;

export async function getWeather() {
  const lang = currentLanguage;
  const unit = currentLanguage == 'RU' ? translate('m/s') : 'm/s';
  const windSpeedText =
    currentLanguage == 'RU' ? translate('Wind speed') : 'Wind speed';
  const humidityText =
    currentLanguage == 'RU' ? translate('Humidity') : 'Humidity';
  city.placeholder =
    currentLanguage == 'RU' ? translate('[Enter city]') : '[Enter city]';
  try {
    temperature.textContent = 'retrieving data...';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${APIKEY}&units=metric`;
    const res = await fetch(url);
    data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${windSpeedText}: ${Math.ceil(
      data.wind.speed
    )} ${unit}`;
    humidity.textContent = `${humidityText}: ${data.main.humidity}%`;
    setLocalStorage('city', city);
    weatherError.textContent = '';
  } catch (error) {
    weatherError.textContent = data.message;
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    temperature.textContent = '';
  }
}

export default function weather() {
  window.addEventListener('load', () => {
    cityName = getLocalStorage('city', city);
    if (cityName == '') {
      cityName =
        currentLanguage == 'EN' ? 'Nizhny Novgorod' : 'Нижний Новгород';
      city.value =
        currentLanguage == 'EN' ? 'Nizhny Novgorod' : 'Нижний Новгород';
    }
    getWeather();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && isFocused) {
      cityName = city.value;
      getWeather();
    }
  });
  city.addEventListener('focus', () => {
    isFocused = true;
  });
  city.addEventListener('blur', () => {
    isFocused = false;
  });
}
