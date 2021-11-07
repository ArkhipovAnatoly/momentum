import getRandomNum from './random';
import { currentLanguage } from './settings';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const quoteCount = 5;

export default function showQuote() {
  async function getQuotes() {
    const quotes =
      currentLanguage == 'EN' ? './quotesEn.json' : './quotesRU.json';
    const res = await fetch(quotes);
    const data = await res.json();
    shuffle(data);
    let quoteNum = getRandomNum(quoteCount);
    quote.textContent = data[quoteNum].text;
    author.textContent = data[quoteNum].author;
  }

  changeQuote.addEventListener('click', () => {
    changeQuote.classList.add('rotate');

    getQuotes();
    setTimeout(() => {
      changeQuote.classList.remove('rotate');
    }, 1500);
  });

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  window.addEventListener('load', getQuotes);
  getQuotes();
}
