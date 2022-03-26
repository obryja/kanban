var nameInput = document.getElementById('name');
var boardId = boardId;
var usersList = document.getElementById('usersList');
var toDoList = document.getElementsByClassName('toDoList')[0];
var bufferList = document.getElementsByClassName('bufferList')[0];
var workingList = document.getElementsByClassName('workingList')[0];
var doneList = document.getElementsByClassName('doneList')[0];

/*************** display data ***************/

dataFetch('/get_board', {id: boardId})
    .then(data => {
       nameInput.value = data.name;

       for(i = 0; i < data.toDo.length; i++){
            toDoList.innerHTML += "<div draggable='true' class='board__stage__list__item dragTarget " + data.toDo[i].difficulty + "' id='toDo;" + i + ";" + data.toDo[i]._id + "' ondblclick=\"displayModal('changeTask');changeTaskId('toDo;" + i + ";" + data.toDo[i]._id + "'); getTaskById();deleteTaskId('toDo;" + i + ";" + data.toDo[i]._id + "')\"><p>" + data.toDo[i].content + "</p></div>";
        }
        for(i = 0; i < data.buffer.length; i++){
            bufferList.innerHTML += "<div draggable='true' class='board__stage__list__item dragTarget " + data.buffer[i].difficulty + "' id='buffer;" + i + ";" + data.buffer[i]._id + "' ondblclick=\"displayModal('changeTask');changeTaskId('buffer;" + i + ";" + data.buffer[i]._id + "'); getTaskById();deleteTaskId('buffer;" + i + ";" + data.buffer[i]._id + "')\"><p>" + data.buffer[i].content + "</p></div>";
        }
        for(i = 0; i < data.working.length; i++){
            workingList.innerHTML += "<div draggable='true' class='board__stage__list__item dragTarget " + data.working[i].difficulty + "' id='working;" + i + ";" + data.working[i]._id + "' ondblclick=\"displayModal('changeTask');changeTaskId('working;" + i + ";" + data.working[i]._id + "'); getTaskById();deleteTaskId('working;" + i + ";" + data.working[i]._id + "')\"><p>" + data.working[i].content + "</p></div>";
        }
        for(i = 0; i < data.done.length; i++){
            doneList.innerHTML += "<div draggable='true' class='board__stage__list__item dragTarget " + data.done[i].difficulty + "' id='done;" + i + ";" + data.done[i]._id + "' ondblclick=\"displayModal('changeTask');changeTaskId('done;" + i + ";" + data.done[i]._id + "'); getTaskById();deleteTaskId('done;" + i + ";" + data.done[i]._id + "')\"><p>" + data.done[i].content + "</p></div>";
        }

       for(i = 0; i < data.users.length; i++){
            dataFetch('/get_user_by_id', {id: data.users[i]})
                .then(data => {
                    usersList.innerHTML += "<div class='modal__content__list__item'><h3>" + data.username + "</h3></div>";
                });

        
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
    modalContent[2].style.display = "none";
    modalContent[3].style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalContent[0].style.display = "none";
        modalContent[1].style.display = "none";
        modalContent[2].style.display = "none";
        modalContent[3].style.display = "none";
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

/**************** add tasks ****************/

function changeId(id){
    document.getElementsByClassName('changeId')[0].id = id;
}

function addTask(){
    var content = document.getElementById('content').value;
    var difficulty = document.getElementById('difficulty').value;
    var type = document.getElementsByClassName('changeId')[0].id;

    if(type == 'toDo'){
        dataFetch('/update_board', {id: boardId, toDo: {
            "content": content,
            "difficulty": difficulty,
        }});
        location.reload();
    }
    if(type == 'buffer'){
        dataFetch('/update_board', {id: boardId, buffer: {
            "content": content,
            "difficulty": difficulty,
        }});
        location.reload();
    }
    if(type == 'working'){
        dataFetch('/update_board', {id: boardId, working: {
            "content": content,
            "difficulty": difficulty,
        }});
        location.reload();
    }
    if(type == 'done'){
        dataFetch('/update_board', {id: boardId, done: {
            "content": content,
            "difficulty": difficulty,
        }});
        location.reload();
    }
}

/**************** change tasks ****************/

function changeTaskId(id){
    document.getElementsByClassName('changeTaskId')[0].id = id;
}

function getTaskById(){
    let id = document.getElementsByClassName('changeTaskId')[0].id;
    let toSplit = id.split(";")
    var stage = toSplit[0];
    var order = toSplit[1];
    var content = document.getElementById('contentChange');
    var difficulty = document.getElementById('difficultyChange');

    dataFetch('/get_board', {id: boardId})
        .then(data => {
            const type = stage;
            const i = order;

            if(type == 'toDo')  content.value = data.toDo[i].content, difficulty.value = data.toDo[i].difficulty, difficulty.className = data.toDo[i].difficulty
            if(type == 'buffer')  content.value = data.buffer[i].content, difficulty.value = data.buffer[i].difficulty, difficulty.className = data.buffer[i].difficulty
            if(type == 'working')  content.value = data.working[i].content, difficulty.value = data.working[i].difficulty, difficulty.className = data.working[i].difficulty
            if(type == 'done')  content.value = data.done[i].content, difficulty.value = data.done[i].difficulty, difficulty.className = data.done[i].difficulty
        })  
}

var updateTask = document.getElementsByClassName('changeTaskId')[0];

updateTask.addEventListener("click", e => {
    e.preventDefault();
    let id = document.getElementsByClassName('changeTaskId')[0].id;
    let toSplit = id.split(";")
    var stage = toSplit[0];
    var taskId = toSplit[2];
    var content = document.getElementById('contentChange').value;
    var difficulty = document.getElementById('difficultyChange').value;

    dataFetch('/update_task', {taskId: taskId, type: stage, content: content, difficulty: difficulty});
    location.reload();
})

/**************** delete tasks ****************/

function deleteTaskId(id){
    document.getElementsByClassName('deleteTaskId')[0].id = id;
}

var deleteTask = document.getElementsByClassName('deleteTaskId')[0];

deleteTask.addEventListener("click", e => {
    e.preventDefault();
    let id = document.getElementsByClassName('changeTaskId')[0].id;
    let toSplit = id.split(";")
    var stage = toSplit[0];
    var taskId = toSplit[2];

    dataFetch('/delete_task', {taskId: taskId, type: stage});
    location.reload();
})