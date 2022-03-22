var nameInput = document.getElementById('name');
var boardId = boardId;
var usersList = document.getElementById('usersList');

/*************** display data ***************/

dataFetch('/get_board', {id: boardId})
    .then(data => {
       nameInput.value = data.name;

       for(i = 0; i < data.users.length; i++){
            dataFetch('/get_user_by_id', {id: data.users[i]})
                .then(data => {
                    usersList.innerHTML += "<div class='modal__content__list__item'><h3>" + data.username + "</h3></div>";
                })
    }
    });


/*************** change name ***************/

var typewatch = function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    }  
}();

function changeName(){
    nameInput = document.getElementById('name').value;
    dataFetch('/update_board', {"id": boardId, "name": nameInput})
}

/*************** delete board ***************/

var modal = document.getElementsByClassName('modal')[0];
var modalContent = document.getElementsByClassName('modal__content');

function deleteBoard(){
    dataFetch('/delete_board', {"id": boardId})
    location.replace('/');
}

function displayModal(type){
    let modal = document.getElementsByClassName('modal')[0];
    let modalContent = document.getElementsByClassName('modal__content--' + type)[0];
    modal.style.display = 'block';
    modalContent.style.display = 'block';
}

function hideModal(){
    modal.style.display = "none";
    modalContent[0].style.display = "none";
    modalContent[1].style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalContent[0].style.display = "none";
        modalContent[1].style.display = "none";
    }
}

/**************** add users ****************/

function addUser(){
    var username = document.getElementById('username').value;
    dataFetch('/add_user_to_board', {username: username, id: boardId})
        .then(res => {
            if(!res.ok) changeOnAdd()
        }, reason => {
            document.getElementsByClassName('modal__content__form__error')[0].innerHTML = "Nie znaleziono takiej nazwy użytkownika"
            document.getElementById('username').style.borderColor = 'red' 
        })
}

function changeOnAdd(){
    usersList.innerHTML = "";
    document.getElementById('username').value = "";
    document.getElementsByClassName('modal__content__form__error')[0].innerHTML = ""
    document.getElementById('username').style.borderColor = 'black' 

    dataFetch('/get_board', {id: boardId})
    .then(data => {
       nameInput.value = data.name;

       for(i = 0; i < data.users.length; i++){
            dataFetch('/get_user_by_id', {id: data.users[i]})
                .then(data => {
                    usersList.innerHTML += "<div class='modal__content__list__item'><h3>" + data.username + "</h3></div>";
                })
    }
    });

}
