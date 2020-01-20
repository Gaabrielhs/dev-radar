import socketio from 'socket.io'
import Utils from './Utils/util.js'

const connections = []
let io;

export function setupWebSocket(server){ 
    io = socketio(server)

    io.on('connection', socket => {
        console.log(`> Connect on: ${socket.id}`)
        console.log(`> Socket parameters:`)
        console.log(socket.handshake.query)

        const { latitude, longitude, techs } = socket.handshake.query
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),    
            },
            techs: Utils.stringToArray(techs)
        })
    })
}

export function findConnections({ coordinates, techs }){
    return connections.filter(conn => {
        return Utils.calculateDistance(coordinates, conn.coordinates) < 10
            && conn.techs.some(tech => techs.includes(tech))
    })
}

export function sendMessages(to, message, data){
    to.forEach(conn => {
        io.to(conn.id).emit(message, data)
    })
}