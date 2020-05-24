const express = require('express')
const routes = require('./routes')
const app = express();
const cors = require('cors')

const corsOptions = {
    exposedHeaders: 'X-Total-Count',
  };
app.use(cors(corsOptions))

app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log('Server ON')
})