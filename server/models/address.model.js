const mongoose = require('mongoose');



////////////////// Address Schema /////////////////////////////////////////

const Schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    state: {
        type: String,
        required: true
    },
    city: {
        typr: String,
        required: true
    }

})
const Address = mongoose.model('address', Schema);
module.exports = Address;
