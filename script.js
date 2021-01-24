
window.onload = () => {
    // addMovies();
    fetchMovies();
}


function fetchMovies() {
    fetch('https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
        addMovies(data);
    })
}


function addMovies(movies){
    let moviesEl = document.querySelector('.original_movies');
    // <img src="https://wallpapercave.com/wp/wp1934780.jpg" alt="">
    for(let i = 0;i < movies.results.length;i++){
        moviesEl.innerHTML += movies.results[i]["url(\"backdrop_path\")"];
    }
}

// addMovies()