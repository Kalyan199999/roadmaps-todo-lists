const express = require('express')
const cors = require("cors")
require('dotenv').config();

const connectDB  = require('./database/dbConfig')

const userRoute = require('./routes/userRoute')

const app = express();

app.use( express.json() )
app.use( cors() )

app.use( '/user' , userRoute )

const PORT = process.env.PORT;

app.listen( PORT , ()=>
{
    console.log(`Server started on the port: localhost:${PORT}`);
    connectDB()
})