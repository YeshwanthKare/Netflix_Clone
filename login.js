let form = document.getElementById("loginForm");
let apiUrl = `http://localhost:3000`



form.addEventListener("submit", (e) => {
    e.preventDefault();
    let payload = {
        email: form.email.value,
        password: form.password.value
    }
    console.log(payload);

    fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((response) => {
        if(response.ok) {
            return response.json();
        }else{
            throw new Error('Something went wrong');
        }
    })
    .then((response) => {
        localStorage.setItem("token", response.token);
        location.href = "/"
    })
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
})