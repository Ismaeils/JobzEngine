const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const Job = require('../models/Job');
const sampleJobs = require('../../samplejobs.json')

const getJobs = async (req,res) => { 
    let {sort_by,sort_type, technology, location} = req.query;
    let {startIndex, limit, next_page, previous_page} = res.customOptions;

    let result = {
        next_page,
        previous_page
    }   
    try{
        result.jobs = await Job
            .find({location: {$regex: location}, technologies: {$regex: technology}})
            .sort([[sort_by, sort_type]])
            .limit(limit)
            .skip(startIndex)
            .exec();
        
        res.json(result);
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = {
    getJobs
}