const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{timestamp: {type: Number}}]
}, {timestamps: true})


// MODEL
const URLModel = mongoose.model("urls", URLSchema)

module.exports = URLModel;