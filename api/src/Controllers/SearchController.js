import Utils from '../Utils/util.js'
import Dev from '../Models/Dev.js'

export default {

    async index(req, res) {
        const { latitude, longitude, techs } = req.query
        const techsArray = Utils.stringToArray(techs)
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    //500Km
                    $maxDistance: 500000
                }
            }
        })
        return res.json({ devs })
    }
}