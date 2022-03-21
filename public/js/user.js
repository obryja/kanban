function add(){
    var name = document.getElementById('name').value;
    dataFetch('/add_board', {"name": name});
    location.reload();
}

var boards = document.getElementsByClassName('boards__list')[0];

 dataFetch("/get_user")
    .then(data => {
        document.getElementById('welcome').innerHTML = "Witaj <span class='username'>" + data[0].username + "</span> !";
    });

dataFetch("/get_boards_of_user")
    .then(data => {
        for(i = 0; i < data.length; i++){
            boards.innerHTML += "<a href='/board/" + data[i]._id + "'><div class='boards__list__item'><h1>" + data[i].name + "</h1></div></a>";
        }
    })