window.onload = () => {
    fetchOriginals();
    fetchTrending();
    fetchTopRated();
    getGenres()
}

function fetchOriginals () {
    var url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
    fetchMovies(url, '.original_movies', 'poster_path');
    
}


function fetchMoviesBasedOnGenres(genreId) {
    var url = `https://api.themoviedb.org/3/discover/movie?`
    url += `api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    url += `&with_genres=2${genreId}`;
    return fetch(url)
    .then((res) => {
        if(res.ok){
            return res.json();            
        } else {
            console.log("Something went wrong");
        }
    })
}


function fetchMovies(url, element_selector, path_type) {
   fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        }else {
            throw new Error("Something went wrong");
        }
    })
    .then((data) => {
        showMovies(data, element_selector, path_type)
        console.log(data)
    })
    .catch((error) => {
        console.log(error);
    }) 
}


async function getMovieTrailer(id) {
    var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
    return await fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        }else {
            throw new Error("Something went wrong");
        }
    })

}


const setTrailers = (trailers) => {
    const iframe = document.getElementById("movieTrailer");
    const movieNotFound = document.querySelector(".movieNotFound");
    if (trailers.length > 0) {
        movieNotFound.classList.add('d-none');
        iframe.classList.remove("d-none");
        iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
    }else {
        iframe.classList.add("d-none");
        movieNotFound.classList.remove("d-none");
    }
}


const handleMovieSection = (e) => {
    const id = e.target.getAttribute('data-id');
    // console.log(id);
    const iframe = document.getElementById("movieTrailer");

    getMovieTrailer(id).then((data) => {
        const results = data.results;
        // console.log(results)
        const youTubeTrailers = results.filter((result) => {
            if(result.site == "YouTube" && result.type == "Trailer"){
                return true;
            }else {
                return false;
            }
        })

        setTrailers(youTubeTrailers);
        
    })
    // console.log(e.target);
    $('#trailer-modal').modal('show');
}

function showMovies(movies, element_selector, path_type){
   var movieEl = document.querySelector(element_selector);
    for(var movie of movies.results){
        let movieElement = document.createElement("img");
        movieElement.setAttribute('data-id', movie.id);
        movieElement.src =`https://image.tmdb.org/t/p/original${movie[path_type]}`
        // console.log(movieElement)
        movieElement.addEventListener("click", (e) => {
            handleMovieSection(e);
        })
        movieEl.appendChild(movieElement);
    }
}


function showMoviesGenres(genres) {
    genres.genres.forEach((genre) => {
        var movies = fetchMoviesBasedOnGenres(genre.id);
        movies.then((movies) => {
            showMovieBasedOnGenre(genre.name, movies)
        })
        .catch(err => {
            console.log(err)
        })
    })
    
}


function showMovieBasedOnGenre(genreName, movies) {
    // console.log(genreName, movies)
    let allMovies = document.querySelector('.movies');
    let genreEl = document.createElement("div");
    genreEl.classList.add("movies__header");
    genreEl.innerHTML = `
        <h2>${genreName}</h2>
    `

    var movieEl = document.createElement('div');
    movieEl.classList.add("movies__container")
    movieEl.setAttribute("id", genreName);

    for(var movie of movies.results){
        var imageElement = document.createElement("img");
        imageElement.setAttribute("data-id", movie.id);

        imageElement.src = `https://image.tmdb.org/t/p/original${movie["backdrop_path"]}`;
        imageElement.addEventListener("click", (e) => {
            handleMovieSection(e);
        })
        movieEl.appendChild(imageElement);
    }
  

    
    allMovies.appendChild(genreEl);
    allMovies.appendChild(movieEl);
    // console.log(movieEl)
}


function getGenres() {
    var url = `https://api.themoviedb.org/3/genre/movie/list?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
    fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        }else {
            throw new Error("Something went wrong");
        }
    })
    .then((data) => {
        showMoviesGenres(data)
        console.log(data)
    })
    .catch((error) => {
        console.log(error);
    })
}


function fetchTrending(){
    var url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
    fetchMovies(url, '#trending', 'backdrop_path');
   
}

function fetchTopRated(){
    var url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
    fetchMovies(url, '#top_rated', 'backdrop_path');
}


// https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28

// genres url
// https://api.themoviedb.org/3/genre/movie/list?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US