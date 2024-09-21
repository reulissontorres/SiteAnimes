// Função para carregar a lista de animes na página inicial
function loadAnimes() {
    const animeList = document.getElementById('anime-list');
    animeList.innerHTML = '';
  
    animes.forEach(anime => {
      const animeCard = document.createElement('div');
      animeCard.classList.add('anime-card');
      animeCard.innerHTML = `
        <img src="${anime.imageUrl}" alt="${anime.title}">
        <h3>${anime.title}</h3>
      `;
      animeCard.onclick = () => {
        window.location.href = `anime.html?title=${encodeURIComponent(anime.title)}`;
      };
      animeList.appendChild(animeCard);
    });
  }
  
  // Função para carregar os detalhes de um anime
  function loadAnimeDetails() {
    const params = new URLSearchParams(window.location.search);
    const animeTitle = params.get('title');
    const anime = animes.find(a => a.title === animeTitle);
    
    if (anime) {
      document.getElementById('anime-title').innerText = anime.title;
      const episodeList = document.getElementById('episode-list');
      anime.episodes.forEach((episode, index) => {
        const episodeItem = document.createElement('li');
        episodeItem.innerHTML = `<a href="episode.html?title=${encodeURIComponent(anime.title)}&episode=${index}">${episode.title}</a>`;
        episodeList.appendChild(episodeItem);
      });
    }
  }
  
  // Função para carregar o player do episódio
  function loadEpisode() {
    const params = new URLSearchParams(window.location.search);
    const animeTitle = params.get('title');
    const episodeIndex = parseInt(params.get('episode'));
    const anime = animes.find(a => a.title === animeTitle);
    
    if (anime && anime.episodes[episodeIndex]) {
      document.getElementById('anime-title').innerText = anime.title;
      document.getElementById('episode-title').innerText = anime.episodes[episodeIndex].title;
      document.getElementById('episode-player').src = anime.episodes[episodeIndex].url;
      
      document.getElementById('prev-episode').onclick = () => {
        if (episodeIndex > 0) {
          window.location.href = `episode.html?title=${encodeURIComponent(anime.title)}&episode=${episodeIndex - 1}`;
        }
      };
      
      document.getElementById('next-episode').onclick = () => {
        if (episodeIndex < anime.episodes.length - 1) {
          window.location.href = `episode.html?title=${encodeURIComponent(anime.title)}&episode=${episodeIndex + 1}`;
        }
      };
      
      document.getElementById('back-to-list').onclick = () => {
        window.location.href = `anime.html?title=${encodeURIComponent(anime.title)}`;
      };
    }
  }
  
  // Função de pesquisa
  document.getElementById('search-bar').oninput = function () {
    const query = this.value.toLowerCase();
    const filteredAnimes = animes.filter(anime => anime.title.toLowerCase().includes(query));
    const animeList = document.getElementById('anime-list');
    animeList.innerHTML = '';
    
    filteredAnimes.forEach(anime => {
      const animeCard = document.createElement('div');
      animeCard.classList.add('anime-card');
      animeCard.innerHTML = `
        <img src="${anime.imageUrl}" alt="${anime.title}">
        <h3>${anime.title}</h3>
      `;
      animeCard.onclick = () => {
        window.location.href = `anime.html?title=${encodeURIComponent(anime.title)}`;
      };
      animeList.appendChild(animeCard);
    });
  };
  
  window.onload = () => {
    if (window.location.pathname.endsWith('index.html')) {
      loadAnimes();
    } else if (window.location.pathname.endsWith('anime.html')) {
      loadAnimeDetails();
    } else if (window.location.pathname.endsWith('episode.html')) {
      loadEpisode();
    }
  };
  