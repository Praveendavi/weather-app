const mongoose = require('mongoose')

const weatherSchema = new mongoose.Schema({
    temp:{ type: String },
    des:{ type: String },
    city:{ type: String }
})

module.exports = mongoose.model("Data", weatherSchema)