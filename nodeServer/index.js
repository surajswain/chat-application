


const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
    },
});

const users = {}

io.on('connection', socket => {

    socket.on('new-user-joined', fname => {
        console.log("hi", fname);
        users[socket.id] = fname;
        socket.broadcast.emit('user-joined', fname);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    var naam = users[socket.id];

    socket.on('disconnect', () => {

        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })

})