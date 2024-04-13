const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjg5YWZiZTA2MDhmYWUzNDYzYjlkOWQ3ZjZjZWVlMSIsInN1YiI6IjY1NTUzZjkwYWM0MTYxMDBlMzNkNGEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MnI81qUcrAZ0SyIDwbaQBQw-x_htk7E7xWnMw9zhdoc'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
        const data = response;
        data.results.forEach(data => {
            const {title, poster_path, vote_average, overview} = data;
            const container = document.querySelector('.container');
            const div = document.createElement('div');
            div.innerHTML = `
            <a><img class="image" src="${IMG_URL + data.poster_path}" alt=""></a>
            <a href=""><h3 class="nome">${data.title}</h3></a>
            <div class="ultimas-info">
                <div><i style="color: yellow;" class="fa-solid fa-star"></i><a></i>${vote_average}</a></div>
                <div><i class="fa-regular fa-calendar-days"></i> <span class='date'>${data.release_date}</span></div>
            </div>`;
            container.appendChild(div);
        });
    })
    .catch(err => console.error(err));
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
document.addEventListener('DOMContentLoaded', () => {
    const option = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    const searchForm = document.querySelector('.pesquisar-div');
    const searchInput = document.querySelector('#search');
    const searchResults = document.querySelector('.container');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm === '') {
            return; // Não faz nada se o campo de pesquisa estiver vazio
        }

        const url = `https://api.themoviedb.org/3/search/movie?include_adult=true&language=pt-BR&page=1&query=${encodeURIComponent(searchTerm)}`;

        fetch(url, options)
            .then(response => response.json())
            .then(data => displayResults(data.results))
            .catch(error => console.error('Erro ao buscar filmes:', error));
    });

    function displayResults(results) {
        searchResults.innerHTML = ''; // Limpa resultados anteriores

        if (results.length === 0) {
            searchResults.innerHTML = '<p>Nenhum filme encontrado.</p>';
            return;
        }

        const movies = results.map(movie => {
            const div = document.createElement('div');
            div.innerHTML = `
            <a><img class="image" src="${IMG_URL + movie.poster_path}" alt=""></a>
            <a href=""><h3 class="nome">${movie.title}</h3></a>
            <div class="ultimas-info">
                <div><i style="color: yellow;" class="fa-solid fa-star"></i><a></i>${movie.vote_average}</a></div>
                <div><i class="fa-regular fa-calendar-days"></i> <span class='date'>${movie.release_date}</span></div>
            </div>`;
             searchResults.appendChild(div);
        }).join('');

    }
});