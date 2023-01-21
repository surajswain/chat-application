
const socket = io('http://localhost:8000');

const form = document.getElementById('messagesend');
const msgInp = document.getElementById("messageinp");
const messageContainer = document.getElementById('containID');

const fname = prompt("Enter your name ");

var audio = new Audio('ting.mp3');
const addmsg = (message, position) => {

    const msgElement = document.createElement('div');

    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageContainer.append(msgElement);
    if (position == 'left')
        audio.play();


}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInp.value;
    addmsg(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInp.value = '';

})


socket.emit('new-user-joined', fname);

socket.on('user-joined', fname => {
    console.log("i am in");
    addmsg(`${fname} joined the chat`, 'left');
});

socket.on('receive', data => {

    addmsg(`${data.name} : ${data.message}`, 'left');
});

socket.on('leave', naam => {

    addmsg(`${naam} left the chat`, 'left');
})