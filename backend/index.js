const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express()
const port = 5000  // because at 3000 port react app wil run

app.use(cors())
app.use(express.json()) // To use req.body(json) to console.log in object form

// Available Routes

app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello Harry!')
// })



app.listen(port, () => {
  console.log(`Anonymous Notebook backend listening at http://localhost:${port}`)
})

