const mongoose = require('mongoose');
////////////////// Address Schema /////////////////////////////////////////

const countrySchema = mongoose.Schema({

    countryId: { String },
    countryName: { String }
});

const country = mongoose.model("Country", countrySchema);
module.exports = country;




