const mongoose = require('mongoose');


const citySchema = mongoose.Schema({
    cityId: { String },
    stateId: { String },
    cityName: { String }
})

const City = mongoose.model("City", citySchema);

module.exports = City;
