const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const router = require('./src/router/router')
const { connection } = require('./db')


app.use(cors())
app.use('/', router)


function run() {
    try {
        connection.connect((err) => {
            if (err) {
                console.log('failled to connect to mysql database')
            } else {
                console.log('database connection successfull')
            }
        })

        app.listen(process.env.port, () => {
            console.log(`server listenig at port ${process.env.port}`)
        })

    } catch (error) {
        console.log(error)
    }
}
run()