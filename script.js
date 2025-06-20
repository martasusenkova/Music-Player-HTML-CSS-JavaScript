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
song.addEventListener("ended", nextSong);
