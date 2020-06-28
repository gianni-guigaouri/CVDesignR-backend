import { Offer } from '../models/offerModel'

export const addNewOffer = (req, res) => {
  const newOffer = new Offer(req.body)
  newOffer.save()
    .then((offer) => {
      res.json(offer)
    })
    .catch((err) => {
      res.send(err)
    })
}

export const getOffers = (req, res) => {
  Offer.find().sort({ createdAt: -1 })
    .then((err, offer) => {
      if (err) {
        res.send(err)
      }
      res.json(offer)
    })
}
