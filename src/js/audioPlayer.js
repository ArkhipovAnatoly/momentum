import playList from './playList';
const playerPlayList = document.querySelector('.play-list');
const trackCount = playList.length;
const playButton = document.querySelector('.play');
const playButtonExtended = document.querySelector('.audio-controls .play');
const nextTrack = document.querySelector('.play-next');
const prevTrack = document.querySelector('.play-prev');
const nextTrackExtended = document.querySelector('.audio-controls .play-next');
const prevTrackExtended = document.querySelector('.audio-controls .play-prev');
const playerPlayListExtended = document.querySelector('.play-list-extended');
const audioTotalTime = document.querySelector('.audio-total-time');
const audioCurrentTime = document.querySelector('.audio-current-time');
const audioProgressBar = document.querySelector('.audio-progress');
const audioVolumeBar = document.querySelector('.audio-volume');
const audioSound = document.querySelector('.audio-sound');
const audioTitle = document.querySelector('.audio-title');

let tracks;
let tracksExtended;
let volume = 0.5;
let audioDuration = 0;
let listButtonsExtended;
let isExtended = false;
const audio = new Audio();

let playNum = 0;
let currentNum = 0;
let isPlay = false;
audio.src = playList[playNum].src;
audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;

export default function audioPlayer() {
  function createHTMLPLayList() {
    playList.forEach((element, index) => {
      const li = document.createElement('li');
      if (index == 0) {
        li.classList.add('active');
      }
      li.classList.add('play-list-item');
      li.textContent = element.title;
      playerPlayList.append(li);
    });
    tracks = document.querySelectorAll('.play-list-item');
  }

  nextTrack.addEventListener('click', () => {
    isExtended = false;
    listButtonsExtended.forEach((track, index) => {
      if (track.classList.contains('pause') && index == playNum) {
        track.classList.remove('pause');
      }
    });
    playNum++;
    if (playNum == trackCount) {
      playNum = 0;
    }
    audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    audio.src = playList[playNum].src;
    playButton.classList.remove('pause');
    changeActive(playNum);
    isPlay = false;
    tracks[playNum].classList.toggle('active');
  });
  prevTrack.addEventListener('click', () => {
    isExtended = false;
    listButtonsExtended.forEach((track, index) => {
      if (track.classList.contains('pause') && index == playNum) {
        track.classList.remove('pause');
      }
    });
    playNum--;
    if (playNum < 0) {
      playNum = trackCount - 1;
    }
    audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    audio.src = playList[playNum].src;
    isPlay = false;
    playButton.classList.remove('pause');
    changeActive(playNum);
    tracks[playNum].classList.toggle('active');
  });

  audio.addEventListener('ended', () => {
    if (isExtended) {
      return;
    }
    listButtonsExtended.forEach((track, index) => {
      if (track.classList.contains('pause') && index == playNum) {
        track.classList.remove('pause');
      }
    });
    audio.currentTime = 0;
    audio.pause();
    isPlay = false;
    playButton.classList.toggle('pause');
    playButtonExtended.classList.toggle('pause');
    playNum++;
    if (playNum == trackCount) {
      playNum = 0;
    }
    audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    audio.src = playList[playNum].src;
    changeActive(playNum);
    tracks[playNum].classList.toggle('active');
    playAudio();
  });

  playButton.addEventListener('click', () => {
    isExtended = false;

    listButtonsExtended[playNum].classList.toggle('pause');
    playAudio();
  });

  function playAudio() {
    if (isPlay) {
      isPlay = false;
      audio.currentTime = 0;
      playButton.classList.toggle('pause');
      playButtonExtended.classList.toggle('pause');
      audio.pause();
    } else {
      isPlay = true;
      playButton.classList.toggle('pause');
      playButtonExtended.classList.toggle('pause');
      audio.play();
    }
  }

  createHTMLPLayList();
}

function changeActive(currentTrack) {
  tracks.forEach((track, index) => {
    if (track.classList.contains('active') && index != currentTrack)
      track.classList.toggle('active');
  });
}
function changeActiveExtended(currentTrack) {
  listButtonsExtended.forEach((track, index) => {
    if (!track.classList.contains('pause') && index == currentTrack) {
      track.classList.add('pause');
    } else if (track.classList.contains('pause') && index == currentTrack) {
      track.classList.remove('pause');
    }
  });
}

export function audioPlayerExtended() {
  function createHTMLPLayListExtended() {
    playList.forEach((element, index) => {
      const li = document.createElement('li');

      if (index == 0) {
        li.classList.add('active');
      }
      li.classList.add('play-list-item-extended');
      li.textContent = element.title;
      playerPlayListExtended.append(li);
    });
    tracksExtended = document.querySelectorAll('.play-list-item-extended');
    tracksExtended.forEach((track) => {
      const button = document.createElement('button');
      button.classList.add('play-list-item-extended-icon');
      track.prepend(button);
    });

    listButtonsExtended = document.querySelectorAll(
      '.play-list-item-extended-icon'
    );

    listButtonsExtended.forEach((button, index) => {
      button.addEventListener('click', (event) => {
        isExtended = true;
        playNum = index;
        audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
        listButtonsExtended.forEach((track, index) => {
          if (track.classList.contains('pause') && index != playNum) {
            track.classList.remove('pause');
            isPlay = false;
          }
        });
        if (currentNum != playNum) {
          changeActive(playNum);
          tracks[playNum].classList.toggle('active');
          playButton.classList.add('pause');
        } else {
          playButton.classList.remove('pause');
        }
        currentNum = playNum;
        event.target.classList.toggle('pause');
        audio.src = playList[playNum].src;

        playAudioExtended();
      });
    });
  }

  playButtonExtended.addEventListener('click', () => {
    isExtended = true;
    playButtonExtended.classList.toggle('pause');
    playButton.classList.toggle('pause');
    changeActiveExtended(playNum);
    playAudioExtended();
  });
  function playAudioExtended() {
    if (isPlay) {
      isPlay = false;
      playButtonExtended.classList.remove('pause');

      audio.currentTime = 0;
      audio.pause();
    } else {
      isPlay = true;
      audio.play();
      playButtonExtended.classList.add('pause');
    }
  }
  nextTrackExtended.addEventListener('click', () => {
    listButtonsExtended.forEach((track, index) => {
      if (track.classList.contains('pause') && index == playNum) {
        track.classList.remove('pause');
      }
    });
    playNum++;
    if (playNum == trackCount) {
      playNum = 0;
    }
    currentNum = playNum;
    isPlay = false;
    audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    audio.src = playList[playNum].src;
    playButtonExtended.classList.remove('pause');
    playButton.classList.add('pause');
    changeActive(playNum);
    listButtonsExtended[playNum].classList.toggle('pause');
    tracks[playNum].classList.toggle('active');
    playAudioExtended();
  });
  prevTrackExtended.addEventListener('click', () => {
    listButtonsExtended.forEach((track, index) => {
      if (track.classList.contains('pause') && index == playNum) {
        track.classList.remove('pause');
      }
    });
    playNum--;
    if (playNum < 0) {
      playNum = trackCount - 1;
    }
    isPlay = false;
    currentNum = playNum;
    audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    audio.src = playList[playNum].src;
    playButtonExtended.classList.remove('pause');
    changeActive(playNum);
    playButton.classList.add('pause');
    tracks[playNum].classList.toggle('active');
    listButtonsExtended[playNum].classList.toggle('pause');
    playAudioExtended();
  });

  function audioTime(time) {
    time = parseInt(time);
    let minutes = parseInt(time / 60);
    let seconds = parseInt(time - minutes * 60);

    minutes < 10 && (minutes = '0' + minutes);
    seconds < 10 && (seconds = '0' + seconds);

    return minutes + ':' + seconds;
  }
  function audioProgress() {
    isExtended = true;
    let audioProgress = Math.round(audio.currentTime / (audioDuration / 100));
    audioCurrentTime.textContent = audioTime(audio.currentTime) + '/';
    audioProgressBar.value = audioProgress;
    setBackgroundGradient(audioProgressBar, audioProgress);
  }
  function audioSetVolume() {
    isExtended = true;
    volume = audioVolumeBar.value / 100;
    audio.volume = volume;
    audio.volume === 0
      ? audioSound.classList.add('mute')
      : (audioSound.classList.remove('mute'), (audio.muted = false));
    setBackgroundGradient(audioVolumeBar, volume * 100);
  }

  function audioMute() {
    isExtended = true;
    audio.muted
      ? (audioSound.classList.remove('mute'),
        (audio.volume = volume),
        (audio.muted = false),
        (audioVolumeBar.value = volume * 100),
        setBackgroundGradient(audioVolumeBar, volume * 100))
      : ((audioVolumeBar.value = 0),
        (audio.muted = true),
        audioSound.classList.add('mute'),
        (audioVolumeBar.style.background = '#c4c4c4'));
  }
  function audioSetProgress() {
    isExtended = true;
    let audioProgressValue = audioProgressBar.value;
    audio.currentTime = (audioProgressValue * audioDuration) / 100;
    setBackgroundGradient(audioProgressBar, audioProgressValue);
  }
  audio.addEventListener('loadeddata', (event) => {
    audioDuration = event.target.duration;
    audioTotalTime.textContent = audioTime(audioDuration);
    audioProgressBar.value = 0;
    setBackgroundGradient(audioProgressBar, 0);
  });
  audio.addEventListener('ended', () => {
    if (!playButtonExtended.classList.contains('pause') || !isExtended) {
      return;
    }
    listButtonsExtended.forEach((track, index) => {
      if (track.classList.contains('pause') && index == playNum) {
        track.classList.remove('pause');
      }
    });
    audio.currentTime = 0;
    audio.pause();
    isPlay = false;
    audioProgressBar.value = 0;
    setBackgroundGradient(audioProgressBar, 0);
    playNum++;
    if (playNum == trackCount) {
      playNum = 0;
    }
    currentNum = playNum;
    audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    audio.src = playList[playNum].src;
    changeActive(playNum);

    tracks[playNum].classList.toggle('active');
    listButtonsExtended[playNum].classList.toggle('pause');
    playAudioExtended();
  });

  audioSound.addEventListener('click', audioMute);
  audioVolumeBar.addEventListener('input', audioSetVolume);
  audio.addEventListener('timeupdate', audioProgress);
  audioProgressBar.addEventListener('input', audioSetProgress);

  function setBackgroundGradient(element, value) {
    element.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  }
  createHTMLPLayListExtended();
}
