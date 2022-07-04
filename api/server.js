const express = require('express')
var cors = require('cors')
const app = express()
const port = 9000
app.use(require('body-parser').json()); 
app.use(cors({
  origin: '*'
}));

const api=require('./routes')
app.use(api)

app.listen(port, () => {
  console.log(`Started functions, listening at http://localhost:${port}`)
})