import socketio from 'socket.io-client'

const socket = socketio('http://192.168.0.10:3333', {
    autoConnect: false
})

function connect(params){
    socket.io.opts.query = params
    socket.connect()

    socket.on('message', text => {
        console.log(`> Mensagem recebida: ${text}`)
    })
}

function disconnect(){
    if(socket.connected){
        socket.disconnect()
    }
}

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction)
}

export default {
    connect,
    disconnect,
    subscribeToNewDevs
}