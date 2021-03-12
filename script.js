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
        movieElement.addEventListener("click", (e) => {
            handleMovieSection(e);
        })
        movieEl.appendChild(movieElement);
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