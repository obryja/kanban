var form = document.getElementsByClassName('login__form')[0];

form.addEventListener("submit", e => {
    e.preventDefault()

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if(!validateRegistration())     return

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
            // there's already user with given username
            case 404:
                document.getElementsByClassName('login__form__group__error')[0].innerHTML = "Istnieje już użytkownik o takiej nazwie";
                document.getElementById('username').style.borderColor = 'red';
                break 
        }

    })
})

validateRegistration = () => {
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;
    var passed = true

    // checks password length
    if(password.length < 6) {
        passed = false
    }
    
    // Checks if passwords match
    if(password != repassword) {
        document.getElementsByClassName('login__form__group__error')[1].innerHTML = "Hasła są różne";
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('repassword').style.borderColor = 'red';
        passed = false
    }

    return passed
}