import express from 'express'
import 'dotenv/config'

const port = process.env.PORT || 8888

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
