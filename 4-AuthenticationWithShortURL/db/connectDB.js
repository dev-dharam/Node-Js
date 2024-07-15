const mongoose = require('mongoose');

async function ConnectDB(mongoUrl){
    return await mongoose.connect(mongoUrl)
}

module.exports = {
    ConnectDB
}