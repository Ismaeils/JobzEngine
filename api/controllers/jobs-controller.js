const Job = require('../models/Job');

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

const addJobs = async (req,res)=>{
    const jobs = req.body.scrapped_jobs;
    if (jobs.length < 1) return res.status(400).json({message: "Array is empty, nothing is added"});
    try{
        const result = await Job.collection.insertMany(jobs);
        return res.status(200).json({message: "Jobs added"});
    }catch(e){
        return res.status(500).json({message: "Some weird error occurred", original_error: e.message});
    }
}

module.exports = {
    getJobs,
    addJobs
}