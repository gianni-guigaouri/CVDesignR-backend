import { getOffers, addNewOffer } from '../ controllers/offersControllers'
import { addNewUser, userLogin } from '../ controllers/userControllers'

const routes = (app) => {
  // Routes offres
  app.route('/addoffer')
    .get((req, res, next) => {
      console.log(`Request de ${req.originalUrl}`)
      console.log(`Request type : ${req.method}`)
      next()
    }, getOffers)
    .post(addNewOffer)

  app.route('/offers')
    .get(getOffers)

  // Routes user

  app.route('/inscription')
    .post(addNewUser)

  app.route('/connexion')
    .post(userLogin)
}

export default routes
