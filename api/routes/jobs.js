const express = require('express')
const {getJobs,addJobs} = require('../controllers/jobs-controller');
const { paginateResults } = require('../middlewares/pagination');
const Job = require('../models/Job');
const router = express.Router()

router.get('/jobs',paginateResults(Job),getJobs)
router.post('/jobs',addJobs)

module.exports = router;