'use strict'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes.js'
import env from '../.env.js'
import { setupWebSocket } from './websocket.js'
 
const app = express()
const server = http.Server(app)

setupWebSocket(server)

app.use(cors())
app.use(express.json())
app.use(routes)

mongoose.connect(`mongodb+srv://${env.username}:${env.password}@cluster0-bncln.mongodb.net/${env.database}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

server.listen(3333, () => {
    console.log('> Server listening at http://localhost:3333')
})