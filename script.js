
window.onload = () => {
    // addMovies();
    fetchMovies();
}


function fetchMovies() {
    fetch('https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213')
    .then((response) => {
        if(response.ok){
            return response.json();
        }else {
            throw new Error("Something went wrong");
        }
        
    })
    .then((data) => {
        // console.log(data);
        addMovies(data);
    })
    .catch((error) => {
        console.log(error);
    })
}


function addMovies(movies){
    let moviesEl = document.querySelector('.original_movies');
    console.log(movies)
    // <img src="https://wallpapercave.com/wp/wp1934780.jpg" alt="">
    for(var movie of movies.results){
        var image = `
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}"></img>
        `
        moviesEl.innerHTML += image;
        console.log(image)
    }
    
}

// addMovies()