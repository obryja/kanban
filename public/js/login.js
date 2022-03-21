var form = document.getElementsByClassName('login__form')[0];

form.addEventListener("submit", e => {
    e.preventDefault()
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then(res => {
        if(!res.ok)     throw res.status

        return res.json()
    })
    /**  @data : object resolved from Promise above. Contains Access and Refresh Tokens */
    .then(data => {
        localStorage.setItem("accessToken", data)
        window.location.replace("/")
    })
    .catch(err => {
        switch(err) {
            // user with given username not found
            case 404:
                document.getElementsByClassName('login__form__group__error')[0].innerHTML = "Nie znaleziono użytkownika o  takiej nazwie";
                document.getElementById('username').style.borderColor = 'red';
                break 
            // invalid password
            case 401:
                document.getElementsByClassName('login__form__group__error')[1].innerHTML = "Hasło jest nieprawne";
                document.getElementById('password').style.borderColor = 'red';
                break 
        }
    })
})