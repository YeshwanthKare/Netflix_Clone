window.onload = () => {
    fetchOriginals();
    fetchTrending();
    fetchTopRated();
}

function fetchOriginals () {
    var url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
    fetchMovies(url, '.original_movies', 'poster_path');
    
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
    })
    .catch((error) => {
        console.log(error);
    })
}

function showMovies(movies, element_selector, path_type){
   var movieEl = document.querySelector(element_selector);
    for(var movie of movies.results){
       let image = `
            <img src="https://image.tmdb.org/t/p/original${movie[path_type]}"></img>
        `
    movieEl.innerHTML += image;
    }
}

function fetchTrending(){
    var url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
    fetchMovies(url, '#trending', 'backdrop_path');
   
}

function fetchTopRated(){
    var url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
    fetchMovies(url, '#top_rated', 'backdrop_path');
   
}