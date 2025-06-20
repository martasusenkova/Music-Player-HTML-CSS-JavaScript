const songs = [
  {
    title: "GO",
    artist: "NEFFEX",
    src: "Neffex - Go!.mp3",
    img: "neffex0.png",
  },
  {
    title: "Best of me",
    artist: "NEFFEX",
    src: "Best of me.mp3",
    img: "neffex.png",
  },
  {
    title: "6 Shots",
    artist: "NEFFEX",
    src: "6 Shots.mp3",
    img: "neffex2.png",
  },
  // Добавляешь сколько хочешь
];

let currentSongIndex = 0;
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

document.getElementById("volume").oninput = function () {
  song.volume = Math.min(Math.max(this.value, 0), 1);
};

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};
function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

setInterval(() => {
  if (!isNaN(song.duration)) {
    progress.value = song.currentTime;
  }
}, 500);

progress.onchange = function () {
  song.currentTime = progress.value;
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

function loadSong(index) {
  const songData = songs[index];
  song.src = songData.src;
  document.querySelector(".song-img").src = songData.img;
  document.querySelector("h1").innerText = songData.title;
  document.querySelector("p").innerText = songData.artist;
  progress.value = 0;
}
document.querySelector(".fa-forward").addEventListener("click", nextSong);
document.querySelector(".fa-backward").addEventListener("click", prevSong);

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  song.play();
  updateIconPlaying();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  song.play();
  updateIconPlaying();
}

function updateIconPlaying() {
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

loadSong(currentSongIndex);

function selectSong(index) {
  currentSongIndex = index;
  loadSong(index);
  song.play();
  updateIconPlaying();
}

const songListDiv = document.querySelector(".song-list ul");
const burgerIcon = document.querySelector(".fa-bars");
const songListContainer = document.querySelector(".song-list");

// Создать список
songs.forEach((songItem, index) => {
  const li = document.createElement("li");
  li.innerText = `${songItem.title} - ${songItem.artist}`;
  li.onclick = () => {
    selectSong(index);
    songListContainer.classList.add("hidden"); // скрыть список после выбора
  };
  songListDiv.appendChild(li);
});

// Открыть/закрыть список + переключить иконку
burgerIcon.parentElement.addEventListener("click", () => {
  songListContainer.classList.toggle("hidden");

  if (burgerIcon.classList.contains("fa-bars")) {
    burgerIcon.classList.remove("fa-bars");
    burgerIcon.classList.add("fa-xmark");
  } else {
    burgerIcon.classList.remove("fa-xmark");
    burgerIcon.classList.add("fa-bars");
  }
});
let isLoop = false;
let isShuffle = false;

function toggleLoop() {
  isLoop = !isLoop;
  song.loop = isLoop; // встроенный loop
  document.querySelector(".btn-loop").style.backgroundColor = isLoop
    ? "#f53192"
    : "#fff";
  document.querySelector(".btn-loop").style.color = isLoop ? "#fff" : "#f53192";
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.querySelector(".btn-shuffle").style.backgroundColor = isShuffle
    ? "#f53192"
    : "#fff";
  document.querySelector(".btn-shuffle").style.color = isShuffle
    ? "#fff"
    : "#f53192";
}

// Обрабатываем конец трека
song.addEventListener("ended", () => {
  if (isShuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);
    song.play();
    updateIconPlaying();
  } else if (!isLoop) {
    nextSong();
  }
});
