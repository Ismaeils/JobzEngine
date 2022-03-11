const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema({
  title: String,
  location: {type:String, index:true},
  description: String,
  technologies: String,
  experience: Number,
  post_date: String,
  responsibilities: String,
  company_name: String
});

module.exports = mongoose.model('Job', jobSchema);