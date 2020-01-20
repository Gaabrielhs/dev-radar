import Router from 'express'

import DevController from './Controllers/DevController.js'
import SearchController from './Controllers/SearchController.js'

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.get('/search', SearchController.index)

export default routes
