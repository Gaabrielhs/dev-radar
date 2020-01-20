import github from '../Services/github.js'
import { stringToArray } from '../Utils/util.js'
import Dev from '../Models/Dev.js'
import { findConnections, sendMessages } from '../websocket.js'

const githubApi = github()

export default {

    async index(req, res){
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        const hasDev = await Dev.findOne({ github_username })
        if(hasDev) return res.json(hasDev)

        const apiResponse = await githubApi.getUser(github_username)
        
        const { name = login, avatar_url, bio } = apiResponse.data
        const techsArray = stringToArray(techs)
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        const dev = await Dev.create(
            {
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            }
        )

        const sendSocketMessageTo = findConnections({
            coordinates: { latitude, longitude },
            techs
        })

        sendMessages(sendSocketMessageTo, 'new-dev', dev)
        
        return res.json(dev)
    }
}