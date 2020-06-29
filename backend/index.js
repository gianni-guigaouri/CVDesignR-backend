import express from 'express'

import routes from './src/routes/offersRoutes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express()
const PORT = 5000

// connexion mongoose

mongoose.connect('mongodb+srv://giannikosta:sirius@cluster0-h3xzy.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

// bodyparser

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

app.use(express.static('public'))

app.get('/', (req, res) =>
  res.send(`serveur node et express sur PORT ${PORT}`)
)
app.listen(PORT, () =>
  console.log('OK')
)
