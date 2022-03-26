var boardId = boardId;
var id, content, difficulty, fromWhere, taskId;

document.addEventListener("dragstart", e => {
    e.dataTransfer.setData("Text", e.target.id);
    e.target.style.opacity = '0.5';

    id = e.target.id;
    fromWhere = e.target.parentNode.id;
    let toSplit = id.split(";")
    var stage = toSplit[0];
    taskId = toSplit[2];

    console.log(stage)

    dataFetch('/get_task', {id: taskId, type: stage})
        .then(data => {
            const type = stage;

            if(type == 'toDo')  content = data.toDo[0].content, difficulty = data.toDo[0].difficulty
            if(type == 'buffer')  content = data.buffer[0].content, difficulty = data.buffer[0].difficulty
            if(type == 'working')  content = data.working[0].content, difficulty = data.working[0].difficulty
            if(type == 'done')  content = data.done[0].content, difficulty = data.done[0].difficulty
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
    } 
    else{
        //add to db in case it doesnt drop in dropzone
        var type = fromWhere;
    }
    if(type == 'toDo'){
        dataFetch('/update_board', {id: boardId, toDo: {
            "content": content,
            "difficulty": difficulty,
            "_id": taskId,
        }});
    }
    if(type == 'buffer'){
        dataFetch('/update_board', {id: boardId, buffer: {
            "content": content,
            "difficulty": difficulty,
            "_id": taskId,
        }});
    }
    if(type == 'working'){
        dataFetch('/update_board', {id: boardId, working: {
            "content": content,
            "difficulty": difficulty,
            "_id": taskId,
        }});
    }
    if(type == 'done'){
        dataFetch('/update_board', {id: boardId, done: {
            "content": content,
            "difficulty": difficulty,
            "_id": taskId,
        }});
    }

    document.getElementById(id).id = type + ";" + ";" + taskId;
})