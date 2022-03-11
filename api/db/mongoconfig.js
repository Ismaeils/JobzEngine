const mongoose = require('mongoose');
const initDB = async ()=>{
    mongoose.connect(process.env.DB_URI)
    .then((result)=> console.log("MongoDB Connected"))
    .catch(e => {
        console.log("Couldn't connect to DB because of the following error: ", e.message);
    })
}

module.exports = {
    initDB
}
