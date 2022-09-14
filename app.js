const express = require('express')
const {Server} = require('socket.io')

const app = express()
const server = app.listen(8080, () => console.log('Server up'))

app.use('/chat', express.static('./public'))

const io = new Server(server)

let log = []
// ['Hola', 'Como estas']
// [
//     { userId: 'adsfadfadsfadsfadsfadsf,
        //  message: 'Hola'
//     }
// ]

io.on('connection', socket => {
    console.log(`Client ${socket.id} connected`)
    socket.broadcast.emit('newUserNotification')
    socket.emit('history', log)
    socket.on('message', data => {
        log.push({userId:socket.id, message: data})
        io.emit('history', log)
    })
})