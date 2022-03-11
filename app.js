require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jobsRoutes = require('./api/routes/jobs')
const expressRateLimit = require('./api/config/ratelimit')
const { initDB } = require('./api/db/mongoconfig')
const mongoose = require('mongoose')

initDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressRateLimit) // IP-Based request throttling
app.use('/api/v1', jobsRoutes)

app.listen(3000, () => console.log('JobzEngine is running on 3000'))

module.exports = {
  app
}