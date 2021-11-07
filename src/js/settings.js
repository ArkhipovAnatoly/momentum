import { getWeather } from './weather';
import { showDate, showGreeting } from './time';
import { setBg } from './slider';
import translate from './translate';
import { getLocalStorageValue, setLocalStorageValue } from './localStorage';
import showQuote from './quote';

const settingsMenuTitle = document.querySelector('.settings-menu-title');
const settingsMenuSubtitle = document.querySelector('.settings-menu-subtitle');
const langSetting = document.querySelector('.language-setting p');
const imageSourceSetting = document.querySelector('.image-source-setting p');
const iTag = document.querySelector('.tag p');
const widgetsSubtitle = document.querySelector('.widgets-subtitle');
const greetingSetting = document.querySelector('.greeting-setting p');
const timeSetting = document.querySelector('.time-setting p');
const dateSetting = document.querySelector('.date-setting p');
const quotesSetting = document.querySelector('.quotes-setting p');
const weatherSetting = document.querySelector('.weather-setting p');
const playerSetting = document.querySelector('.player-setting p');
const playerViewSetting = document.querySelector('.player-view-setting p');

const settings = document.querySelector('.settings');
const language = document.querySelector('.language');
const imageSource = document.querySelector('.image-source');
const tag = document.querySelector('.tag');
const appearanceInputs = document.querySelectorAll('input[type=checkbox]');
const imageTag = document.querySelector('.image-tag');
const playerStandard = document.querySelector('.player');
const playerExtended = document.querySelector('.player-extended');
const weatherBlock = document.querySelector('.weather');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting-container');
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const greetingMessage = document.querySelector('.greeting');
const settingsMenu = document.querySelector('.settings-menu');
const city = document.querySelector('.city');

let widgets = [
  'player',
  'weather',
  'quote',
  'date',
  'time',
  'greeting',
  'switch-player',
];
let isFocused = false;
let isPlayerExtended = false;
export let currentLanguage = 'EN';
export let currentImageSource = 'Github';
export let imgTag = '';
function settingsLangToogle() {
  settingsMenuTitle.textContent =
    currentLanguage == 'RU' ? translate('Settings') : 'Settings';
  settingsMenuSubtitle.textContent =
    currentLanguage == 'RU' ? translate('General') : 'General';
  langSetting.textContent =
    currentLanguage == 'RU' ? translate('Language') : 'Language';
  imageSourceSetting.textContent =
    currentLanguage == 'RU' ? translate('Image source') : 'Image source';
  iTag.textContent =
    currentLanguage == 'RU' ? translate('Image tag') : 'Image tag';
  widgetsSubtitle.textContent =
    currentLanguage == 'RU' ? translate('Widgets') : 'Widgets';
  greetingSetting.textContent =
    currentLanguage == 'RU' ? translate('Greeting') : 'Greeting';
  timeSetting.textContent =
    currentLanguage == 'RU' ? translate('Time') : 'Time';
  dateSetting.textContent =
    currentLanguage == 'RU' ? translate('Date') : 'Date';
  quotesSetting.textContent = weatherSetting.textContent =
    currentLanguage == 'RU' ? translate('Quotes') : 'Quotes';
  weatherSetting.textContent =
    currentLanguage == 'RU' ? translate('Weather') : 'Weather';
  playerSetting.textContent =
    currentLanguage == 'RU' ? translate('Audio player') : 'Audio player';
  playerViewSetting.textContent =
    currentLanguage == 'RU' ? translate('Extended player') : 'Extended player';
}

export default function appSettings() {
  language.addEventListener('change', (event) => {
    currentLanguage = event.target.value;
    if (currentLanguage == 'RU' && city.value == 'Nizhny Novgorod') {
      city.value = 'Нижний Новгород';
    } else if (currentLanguage == 'EN' && city.value == 'Нижний Новгород') {
      city.value = 'Nizhny Novgorod';
    }

    settingsLangToogle();
    getWeather();
    showDate();
    showQuote();
    greetingMessage.textContent = showGreeting();
    setLocalStorageValue('lang', currentLanguage);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && isFocused) {
      imgTag = event.target.value;
      setLocalStorageValue('tag', imgTag);
      setBg();
    }
  });
  imageTag.addEventListener('focus', () => {
    isFocused = true;
  });
  imageTag.addEventListener('blur', () => {
    isFocused = false;
    imgTag = imageTag.value;
    setLocalStorageValue('tag', imgTag);
    setBg();
  });

  imageSource.addEventListener('change', (event) => {
    currentImageSource = event.target.value;
    setLocalStorageValue('sourceAPI', currentImageSource);

    currentImageSource == 'Unsplash API' || currentImageSource == 'Flickr API'
      ? tag.classList.add('visible')
      : tag.classList.remove('visible');

    setBg();
  });

  appearanceInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      switch (event.target.id) {
        case 'player':
          toggleElement(playerStandard, event.target.id);
          toggleElement(playerExtended, event.target.id);
          break;
        case 'weather':
          toggleElement(weatherBlock, event.target.id);
          break;
        case 'greeting':
          toggleElement(greeting, event.target.id);
          break;
        case 'quote':
          toggleElement(changeQuote, event.target.id);
          toggleElement(quote, event.target.id);
          toggleElement(author, event.target.id);
          break;
        case 'time':
          toggleElement(time, event.target.id);
          break;
        case 'date':
          toggleElement(date, event.target.id);
          break;
        case 'switch-player':
          playerStandard.classList.toggle('switch-player');
          playerExtended.classList.toggle('switch-player');
          isPlayerExtended = event.target.checked;
          setLocalStorageValue('switch-player', isPlayerExtended);
          break;
        default:
          break;
      }
    });
  });

  function toggleElement(element, id) {
    let isHide;
    element.classList.toggle('hide');
    isHide = element.classList.contains('hide') ? true : false;
    setLocalStorageValue(id, isHide);
  }

  function widgetsAppearance() {
    widgets.forEach((widget) => {
      if (getLocalStorageValue(widget) == 'true') {
        if (widget == 'switch-player') {
          playerStandard.classList.toggle('switch-player');
          playerExtended.classList.toggle('switch-player');
        }
        if (widget == 'player') {
          playerStandard.classList.add('hide');
          playerExtended.classList.add('hide');
        }
        if (widget == 'quote') {
          changeQuote.classList.add('hide');
          quote.classList.add('hide');
          author.classList.add('hide');
        }
        if (widget == 'weather') {
          weatherBlock.classList.add('hide');
        }
        if (widget == 'time') {
          time.classList.add('hide');
        }
        if (widget == 'date') {
          date.classList.add('hide');
        }
        if (widget == 'greeting') {
          greeting.classList.add('hide');
        }
        if (widget == 'switch-player') {
          appearanceInputs.forEach((input) => {
            if (input.id == widget) {
              input.checked = true;
            }
          });
        } else {
          appearanceInputs.forEach((input) => {
            if (input.id == widget) {
              input.checked = false;
            }
          });
        }
      }
    });
  }

  settings.addEventListener('click', (event) => {
    event.stopPropagation();
    settingsMenu.classList.toggle('show');
  });
  window.addEventListener('click', () => {
    settingsMenu.classList.toggle('show');
  });

  settingsMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  window.addEventListener('load', () => {
    const valueLang = getLocalStorageValue('lang');
    const valueSourceAPI = getLocalStorageValue('sourceAPI');
    const valueTag = getLocalStorageValue('tag');

    if (valueTag != '') {
      imgTag = valueTag;
    }

    if (valueLang != '') {
      language.value = valueLang;
      currentLanguage = valueLang;
      settingsLangToogle();
      getWeather();
      showDate();
      greetingMessage.textContent = showGreeting();
    }
    if (valueSourceAPI != '') {
      currentImageSource = valueSourceAPI;
      imageSource.value = valueSourceAPI;
      if (
        currentImageSource == 'Unsplash API' ||
        currentImageSource == 'Flickr API'
      ) {
        tag.classList.add('visible');
      } else {
        tag.classList.remove('visible');
      }
      setBg();
    }

    widgetsAppearance();
  });
}
