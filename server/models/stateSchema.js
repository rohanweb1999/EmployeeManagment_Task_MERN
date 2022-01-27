const mongoose = require('mongoose');


const stateSchema = mongoose.Schema({
    stateId: { String },
    countryId: { String },
    StateName: { String }
});
const State = mongoose.model("State", stateSchema);
module.exports = State;

