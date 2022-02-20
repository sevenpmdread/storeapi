require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const notFound = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
app.use(express.json())


app.get('/',(req,res)=>
{

  res.status(200).send(`<a href="/api/v1/products">Products </a>`)

})

app.use('/api/v1/products',productsRouter)
app.use(notFound)
app.use(errorMiddleWare)
const port = process.env.PORT || 3000

const start = async () =>{
  try {
    //console.log(process.env.process)
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log('Connected to db'))
  } catch (error) {
    console.log(error)
  }
}

start()
