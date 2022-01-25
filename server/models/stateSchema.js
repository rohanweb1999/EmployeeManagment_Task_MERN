const mongoose = require('mongoose');


const stateSchema = mongoose.Schema({
    stateId: { Number },
    countryId: { Number },
    StateName: { String }
});
const State = mongoose.model("State", stateSchema);
module.exports = State;

