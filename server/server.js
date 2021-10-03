const http = require('http')
const path = require('path')
const express = require('express')

const db = require('./db')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors')
  app.use(cors())
}

app.use(express.static(path.join(path.dirname(__dirname), '/build')))

app.get('/companies', (req, res, next) => {
  const { search, specialties } = req.query
  console.log(req.query);
  if (search) {
    let data = db.filter((company) =>
      company.name.toLocaleLowerCase().includes(search.toLowerCase())
    )
    if (specialties) {
      const specialtiesArray = specialties.split(',')
      data = data.filter((company) =>
        specialtiesArray.every((specialty) =>
          company.specialties.includes(specialty.toLocaleLowerCase())
        )
      )
    }
    return res.status(200).send(data)
  }
  return res.status(200).send([])
})

app.get('/', function (req, res) {
  return res.sendFile(path.join(path.dirname(__dirname), 'build', 'index.html'))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  return res.status(500).send({
    message: 'Something went wrong. Internal server error',
  })
})

const PORT = parseInt(process.env.PORT, 10) || 4000

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})
