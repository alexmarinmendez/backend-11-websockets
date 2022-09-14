const socket = io();
let chatInput = document.getElementById('chatInput')

chatInput.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        socket.emit('message', chatInput.value)
    }
})

socket.on('history', data => {
    let history = document.getElementById('history')
    let messages=""
    data.forEach(msg => {
        messages = messages + `[${msg.userId}]: ${msg.message}<br>`
    })
    history.innerHTML = messages
    chatInput.value=""
})

socket.on('newUserNotification', data=>{
    alert('New user connected')
})