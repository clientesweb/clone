// API Key de YouTube (reemplázala por la tuya)
const apiKey = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0';

// Elementos del DOM
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const videoSection = document.getElementById('video-section');

// Buscar videos al hacer clic
searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    searchVideos(query);
});

// Función para buscar videos usando la API de YouTube
function searchVideos(query) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${query}&key=${apiKey}`)
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
