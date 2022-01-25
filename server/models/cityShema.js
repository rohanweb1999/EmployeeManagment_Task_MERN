const mongoose = require('mongoose');


const citySchema = mongoose.Schema({
    cityId: { Number },
    stateId: { Number },
    cityName: { String }
})

const City = mongoose.model("City", citySchema);

module.exports = City;
