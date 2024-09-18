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
        videoSection.appendChild(videoDiv);
    });
}