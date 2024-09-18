// API Key de YouTube (reemplázala por la tuya)
const apiKey = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';
const channelId = 'UCc4fHgV3zRgjHxYZJkQdxhw'; // Reemplázalo con tu ID de canal

// Elementos del DOM
const videoSection = document.getElementById('video-section');

// Mostrar videos al cargar la página
window.onload = () => {
    loadChannelVideos();
};

// Función para cargar videos de un canal específico
function loadChannelVideos() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=9&order=date&type=video&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayVideos(data.items);
        })
        .catch(error => console.log('Error:', error));
}

// Mostrar los videos en el DOM
function displayVideos(videos) {
    videoSection.innerHTML = ''; // Limpiar videos anteriores
    videos.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video');
        videoDiv.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <h3>${video.snippet.title}</h3>
        `;
        videoDiv.addEventListener('click', () => playVideo(video.id.videoId));
        videoSection.appendChild(videoDiv);
    });
}

// Reproducir video en la página
function playVideo(videoId) {
    const playerSection = document.getElementById('player-section');
    playerSection.innerHTML = `
        <iframe width="100%" height="500" src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
    `;
}
// Cargar Shorts
function loadShorts() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&videoDuration=short&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayShorts(data.items);
        });
}

function displayShorts(shorts) {
    const shortsContainer = document.getElementById('shorts-container');
    shorts.forEach(short => {
        const shortDiv = document.createElement('div');
        shortDiv.classList.add('short');
        shortDiv.innerHTML = `<img src="${short.snippet.thumbnails.medium.url}" alt="${short.snippet.title}">`;
        shortDiv.addEventListener('click', () => playVideo(short.id.videoId));
        shortsContainer.appendChild(shortDiv);
    });
}

// Cargar En Vivo
function loadLiveStream() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayLiveStream(data.items[0]); // Mostramos solo el primero si hay más en vivo
        });
}

function displayLiveStream(liveVideo) {
    const liveContainer = document.getElementById('live-container');
    liveContainer.innerHTML = `
        <img src="${liveVideo.snippet.thumbnails.medium.url}" alt="${liveVideo.snippet.title}">
        <h3>${liveVideo.snippet.title}</h3>
        <button onclick="playVideo('${liveVideo.id.videoId}')">Watch Live</button>
    `;
}