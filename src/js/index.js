import '../css/owfont-regular.css';
import '../css/style.css';
import displayTime from './time';
import showQuote from './quote';
import weather from './weather';
import audioPlayer, { audioPlayerExtended } from './audioPlayer';
import slider from './slider';
import appSettings from './settings';

displayTime();
showQuote();
weather();
audioPlayer();
audioPlayerExtended();
slider();
appSettings();

console.info(
  'Hello my dear friend! В данной работе не реализован только доп.функционал '
);
