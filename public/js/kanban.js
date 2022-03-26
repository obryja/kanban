var boardId = boardId;
var id, content, difficulty, fromWhere;

document.addEventListener("dragstart", e => {
    e.dataTransfer.setData("Text", e.target.id);
    e.target.style.opacity = '0.5';

    id = e.target.id;
    fromWhere = e.target.parentNode.id;
    let toSplit = id.split(";")
    var stage = toSplit[0];
    var order = toSplit[1];
    var taskId = toSplit[2];

    dataFetch('/get_board', {id: boardId})
        .then(data => {
            const type = stage;
            const i = order;

            if(type == 'toDo')  content = data.toDo[i].content, difficulty = data.toDo[i].difficulty
            if(type == 'buffer')  content = data.buffer[i].content, difficulty = data.buffer[i].difficulty
            if(type == 'working')  content = data.working[i].content, difficulty = data.working[i].difficulty
            if(type == 'done')  content = data.done[i].content, difficulty = data.done[i].difficulty
        })  

    dataFetch('/delete_task', {taskId: taskId, type: stage});
})

document.addEventListener("drag", e => {

})

document.addEventListener("dragenter", e => {
    if(e.target.classList.contains('dropTarget')){
        e.target.style.backgroundColor = 'rgba(189, 195, 199, 0.5)';
    }
})

document.addEventListener("dragover", e => {
    e.preventDefault()
})

document.addEventListener("dragleave", e => {
    e.target.style.backgroundColor = ''
})

document.addEventListener("dragend", e => {
    e.target.style.opacity = '1';
})

document.addEventListener("drop", e => {
    e.preventDefault();

    if(e.target.classList.contains('dropTarget')){
        e.target.style.backgroundColor = '';
        var data = e.dataTransfer.getData('Text');
        e.target.appendChild(document.getElementById(data));

        //add to db 

        var type = e.target.id;

        if(type == 'toDo'){
            dataFetch('/update_board', {id: boardId, toDo: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
        if(type == 'buffer'){
            dataFetch('/update_board', {id: boardId, buffer: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
        if(type == 'working'){
            dataFetch('/update_board', {id: boardId, working: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
        if(type == 'done'){
            dataFetch('/update_board', {id: boardId, done: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
    } else{
        //add to db in case it doesnt drop in dropzone

        var type = fromWhere;

        if(type == 'toDo'){
            dataFetch('/update_board', {id: boardId, toDo: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
        if(type == 'buffer'){
            dataFetch('/update_board', {id: boardId, buffer: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
        if(type == 'working'){
            dataFetch('/update_board', {id: boardId, working: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
        if(type == 'done'){
            dataFetch('/update_board', {id: boardId, done: {
                "content": content,
                "difficulty": difficulty,
            }});
        }
    }
})