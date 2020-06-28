import { User } from '../models/userModel'
import jwt from 'jsonwebtoken'

// helpers

const isEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  else return false
}

const userPassword = () => {
  var ok = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN'
  var pass = ''
  var longueur = 5
  var i
  for (i = 0; i < longueur; i++) {
    var wpos = Math.round(Math.random() * ok.length)
    pass += ok.substring(wpos, wpos + 1)
  }
  return pass
}

//

export const addNewUser = (req, res) => {
  let newUser = new User(req.body)
  if (req.body.email) {
    if (!req.body.password) {
      const password = userPassword()
      newUser = new User({ email: req.body.email, password: password })
    }
    if (isEmail(req.body.email)) {
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (user) {
            return res.status(400).json({ email: 'Email déjà utilisé' })
          } else {
            newUser.save((err, user) => {
              if (err) {
                res.send(err)
              }
              jwt.sign({ user: user }, 'secretKey', (_err, token) => {
                res.json({ token, user })
              })
            })
          }
        })
    } else {
      return res.status(400).json({ email: 'Merci de saisir un email valide' })
    }
  } else {
    return res.status(400).json({ email: 'Merci de saisir un email' })
  }
}

export const userLogin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ email: 'Ce compte n\'exite pas' })
      } else {
        if (req.body.password === user.password) {
          jwt.sign({ user: user }, 'secretKey', (_err, token) => {
            res.json({ token })
          })
        } else {
          res.status(400).json({ password: 'Mot de passe éronné' })
        }
      }
    })
}
