// Set up the modules
const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

// Declare database variables
let db,
    dbConnectionString = process.env.DB_STRING,
    // Change this to your own database name
    dbName = 'sample_mflix',
    collection

// Connect to the Database
MongoClient.connect(dbConnectionString)
    .then(client => {
        // Change the collection to your own collection name
        db = client.db(dbName)
        collection = db.collection('movies')
        console.log(`Connected to Database`)
    })

// Set up the Middleware
app.set('view engine', 'ejs')
// Set up the front end
app.use(express.static('public'))
// Parse URLs
app.use(express.urlencoded({extended:true}))
// Convert JSON for the front end
app.use(express.json())
// This is not CORS Lite beer. CORS middleware handles cross origin requests (and hopefully gets rid of stupid CORs errors) 
app.use(cors())

// Promise code for front-end data
app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})


//Listener port = 8000 (change this in the env file to add extra security)
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running and we are connected! YAY!!`)
})