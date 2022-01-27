const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    salaryJan: {
        type: Number,
        required: true
    },
    salaryFeb: {
        type: Number,
        required: true
    },
    salaryMar: {
        type: Number,
        required: true
    },
    countryId: {
        type: String,
        required: true
    },
    stateId: {
        type: String,
        required: true
    },
    cityId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    Token: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//hasing the password
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//         this.cpassword = await bcrypt.hash(this.cpassword, 10);
//     }
//     next();
// });
//generating token
userSchema.methods.generateAuthToken = async function () {
    try {

        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.Token = this.Token.concat({ token });

        await this.save();
        // console.log("token", token);
        return token;
    }
    catch (err) {
        const jwt = require('jsonwebtoken');
        const User = require('../models/userSchema');
        const address = require('../models/userSchema');


        module.exports = Authenticate;
    }
}


//model for users collection
const User = mongoose.model('User', userSchema);


module.exports = User;