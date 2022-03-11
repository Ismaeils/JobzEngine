const mongoose = require('mongoose');

const initDB = async ()=>{
    mongoose.connect(process.env.DB_URI).catch(e => {
        console.log("Couldn't connect because of the following error: ", e.message);
    })
}

module.exports = {
    initDB
}
