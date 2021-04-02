checkIfLoggedIn = () => {
    let currentToken = localStorage.getItem("token");
    if(currentToken){
        console.log(currentToken)
        if(location.href == "http://127.0.0.1:5500/login.html"){
            location.href = "/";
        }
    }else {
        // if i am currently not logged in
        // and i am trying to access unauthorized page
        // (trying to access all pages beside login)
        if(location.href != "http://127.0.0.1:5500/login.html"){
            location.href = "/login.html";
        }
    }
}

checkIfLoggedIn();

function logOut() {
    localStorage.removeItem("token");
    location.href = "/login.html"
}