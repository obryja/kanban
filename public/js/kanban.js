var id;

document.addEventListener("dragstart", e => {
    e.dataTransfer.setData("Text", e.target.id);
    e.target.style.opacity = '0.5';
    
    id = e.target.id;
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
    }
})