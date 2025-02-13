// Variables
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const albumArt = document.getElementById('album-art');

// Example song data (You can expand this with a playlist array)
const songs = [
    {
        title: 'Song 1',
        artist: 'Artist 1',
        src: 'song1.mp3',
        albumArt: 'song1.jpg',
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        src: 'song2.mp3',
        albumArt: 'song2.jpg',
    }
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src);

// Update UI with song data
function updateSongUI() {
    songTitle.innerText = songs[currentSongIndex].title;
    artist.innerText = songs[currentSongIndex].artist;
    albumArt.src = songs[currentSongIndex].albumArt;
    audio.src = songs[currentSongIndex].src;
}

// Play/Pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.innerText = 'Play';
    }
}

// Update progress bar as song plays
audio.ontimeupdate = function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
};

// Update progress bar when user scrubs
progressBar.oninput = function() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
};

// Change volume
volumeBar.oninput = function() {
    audio.volume = volumeBar.value / 100;
};

// Next/Previous song
nextBtn.onclick = function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongUI();
    audio.play();
};

prevBtn.onclick = function() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongUI();
    audio.play();
};

// Initialize the UI with the first song
updateSongUI();

// Play/Pause button
playPauseBtn.onclick = togglePlayPause;
