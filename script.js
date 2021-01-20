
window.onload = () => {
    addMovies()
}


function addMovies(){
    let moviesEl = document.querySelector('.original_movies');
    // <img src="https://wallpapercave.com/wp/wp1934780.jpg" alt="">
    for(let i = 0;i < 5;i++){
        moviesEl.innerHTML += '<img src="https://wallpapercave.com/wp/wp1934780.jpg" alt=""></img>'
    }
}

// addMovies()