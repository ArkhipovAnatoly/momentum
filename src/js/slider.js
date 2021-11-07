import { timeOfDay } from './time';
import getRandomNum from './random';
import { currentImageSource, imgTag } from './settings';
const maxImgCount = 20;
const unsplashApiKey = 'rf2A2P_ZVyTv8pzOgfWP1aKRLFzqelyJQidXrqcc1m8';
const flickrApiKey = 'd4b51812c70415b176f35a8dbf94f59e';
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const body = document.querySelector('body');
const imageTag = document.querySelector('.image-tag');

let imageNum = getRandomNum(maxImgCount).toString().padStart(2, '0');

export function setBg() {
  imageTag.value = imgTag == '' ? timeOfDay() : imgTag;
  if (imageNum == '00') {
    imageNum = '01';
  }
  const img = new Image();
  let currentUrl = '';
  if (currentImageSource == 'Github') {
    img.src = `
    https://raw.githubusercontent.com/ArkhipovAnatoly/stage1-tasks/assets/images/${timeOfDay()}/${imageNum}.jpg`;
    currentUrl = img.src;
  } else if (currentImageSource == 'Unsplash API') {
    getLinkToImageAPI('Unsplash API').then((link) => {
      img.src = link;
      currentUrl = img.src;
    });
  } else if (currentImageSource == 'Flickr API') {
    getLinkToImageAPI('Flickr API').then((link) => {
      img.src = link;
      currentUrl = img.src;
    });
  }

  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${currentUrl})`;
  });
}

async function getLinkToImageAPI(type) {
  const url =
    type == 'Unsplash API'
      ? `https://api.unsplash.com/photos/random?query=${imageTag.value}&client_id=${unsplashApiKey}`
      : `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&tags=${imageTag.value}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  return type == 'Unsplash API'
    ? data.urls.regular
    : data.photos.photo[getRandomNum(100)].url_l;
}

export default function slider() {
  slideNext.addEventListener('click', () => {
    imageNum++;
    if (imageNum == maxImgCount + 1) {
      imageNum = 1;
    }
    imageNum = imageNum.toString().padStart(2, '0');
    setBg();
  });

  slidePrev.addEventListener('click', () => {
    imageNum--;
    if (imageNum == 0) {
      imageNum = maxImgCount;
    }
    imageNum = imageNum.toString().padStart(2, '0');

    setBg();
  });

  setBg();
}
