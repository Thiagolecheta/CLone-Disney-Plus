const API_KEY = '3447bdc89ab3df9530a4c12dc3f5172a'
const API_LENGUAGE = 'pt-br'
const BUTTON_PLAY = '<button><img src="/assets/icon-play-button.png" alt="Botão play filme"></button>'
const LIST_MOVIES = ['354912', '150540', '14160', '269149', '177572', '508442', '9806', '82690']

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LENGUAGE}`
}


//script para inicializar os dados do filme principal



function setFeaturedMovie(movieId) {
    fetch(getUrlMovie(movieId))
        .then(response => response.json())
        .then(data => {

            const app = document.getElementById('app')
            const title = document.querySelector('.movie h1')
            const description = document.querySelector('.movie p')
            const rating = document.querySelector('.rating strong')
            const info = document.querySelector('.movie span')




            const release = data.release_date.split('-')[0]

            title.innerHTML = data.title
            description.innerHTML = data.overview
            rating.innerHTML = data.vote_average
            info.innerHTML = `${release} - ${data.genres[0].name} - Movie`


            const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%),url('${image}')`



        })
}

function createBtncMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onclick', `setFeaturedMovie('${movieId}')`)
    button.innerHTML = `<img src="/assets/icon-play-button.png" alt="Botão play filme">`
    return button
}



function createMovie(movieId) {
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        const movie = document.createElement('li')
        const genre = `<span>${data.genres[0].name}</span>`
        const title = `<strong>${data.title}</strong>`
        const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`


        movie.innerHTML = genre + title
        movie.appendChild(createBtncMovie(movieId))
        movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%),url('${image}')`
        moviesList.appendChild(movie)
    })

}

function loadListMovies() {
    LIST_MOVIES.map(createMovie)
}

loadListMovies()
setFeaturedMovie(LIST_MOVIES[0])

