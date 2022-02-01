/**
 * @author Rohan Gajjar
 */
////////////////////// Load module start///////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const User = require('../models/userSchema');
const City = require('../models/cityShema')
const country = require('../models/countrySchema')
const State = require('../models/stateSchema')
require('../db/conn');

////////////////////// Load module end///////////////////////////////////////////////////



router.get("/getAllCountries", async (req, res) => {
    try {
        const result = await country.find();
        res.send(result)
    }
    catch (err) {

        res.send("error" + err);
    }
})

router.get("/getState/:countryId", async (req, res) => {
    const id = req.params.countryId
    try {

        aggregateQuery = [{ $match: { "countryId": id } }]

        const result = await State.aggregate(aggregateQuery)
        res.send(result)
    }
    catch (err) {

        res.send("error" + err);
    }
})
router.get("/getcities/:stateId", async (req, res) => {
    const id = req.params.stateId
    try {

        aggregateQuery = [{ $match: { "stateId": id } }]

        const result = await City.aggregate(aggregateQuery)
        res.send(result)
    }
    catch (err) {

        res.send("error" + err);
    }
})

router.get("/dashboard/getData/page=:pageNumber/:sortBy", authenticate, async (req, res) => {
    const { pageNumber, sortBy } = req.params
    let size = 4
    try {
        aggregateQuery = [
            {
                $lookup: {
                    from: "countries", //collection to join
                    localField: "countryId", //field from the input doc
                    foreignField: "_id", //field from the document of 'from collection'
                    as: "country" //output array field                        
                }
            },
            {
                $lookup: {
                    from: "states",
                    localField: "stateId",
                    foreignField: "_id",
                    as: "state"
                }
            },

            {
                $lookup: {
                    from: "cities",
                    localField: "cityId",
                    foreignField: "_id",
                    as: "city"
                }
            }
        ]



        if (pageNumber) {
            aggregateQuery.push({ $skip: (pageNumber - 1) * size },
                { $limit: parseInt(size) })
        }
        if (sortBy === 'ascending' || sortBy === 'descending') {
            console.log("ascending")
            aggregateQuery.push({ "$sort": { "firstName": sortBy === "ascending" ? 1 : -1 } },)
        } else {
            aggregateQuery.push({
                $match: {
                    $or: [

                        {
                            "firstName": RegExp("^" + sortBy, "i")
                        },
                        {
                            "lastName": RegExp("^" + sortBy, "i")
                        },
                        {
                            "contact": RegExp(sortBy)
                        },
                        {
                            "profession": RegExp("^" + sortBy, "i")
                        },
                        {
                            "email": RegExp("^" + sortBy, "i")
                        },
                        {
                            "country.countryName": RegExp("^" + sortBy, "i")
                        },
                        {
                            "state.stateName": RegExp("^" + sortBy, "i")
                        },
                        {
                            "city.cityName": RegExp("^" + sortBy, "i")
                        }
                    ]
                }

            })
        }
        const users = await User.aggregate(aggregateQuery, { collation: { locale: "en", strength: 1 } })
        console.log(users);
        res.send(users)
    }
    catch (err) {
        res.send("error" + err);
    }
});



//register route
router.post('/signUp', async (req, res) => {
    const userData = new User(req.body)

    try {
        const result = await userData.save();
        res.send((result))
    }
    catch (err) {
        res.send("error" + err)
    };
})

//login route
router.post('/signIn', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: "please filled the data field!" });
        }
        const userLogin = await User.findOne({ email: email, password: password });

        if (userLogin) {
            // const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();

            //store the token in cookie
            res.cookie("jwtLogin", token, {
                expires: new Date(Date.now() + 3600000)
            });
            res.send({ message: "User Login Successfully!" });
        }

    } catch (err) {
        res.send("err" + err)
    }
})

//get user for edit
router.get('/editUser/:id', async (req, res) => {

    try {

        const user = await User.findById(req.params.id)
        res.send(user)
    }
    catch (err) {
        res.send("error" + err)
    };
});

//update user
router.put('/updateUser/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedValue = req.body
        const result = await User.findByIdAndUpdate(id, updatedValue)
        res.send(result);
    }
    catch (err) {
        res.send("error" + err)
    };
});

//delete user
router.delete('/deleteUser/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.send(user)
    }
    catch (err) {
        res.send("error" + err)
    };
});

//for deshboard authentication
router.get('/dashboard', authenticate, (req, res) => {
    res.send(req.authenticateUser);
});

//for logout
router.get('/logout', authenticate, async (req, res) => {

    //remove token from database
    try {
        req.authenticateUser.Token = req.authenticateUser.Token.filter((ele) => {
            return ele.token !== req.token

        })
        //clear cookie
        res.clearCookie("jwtLogin");
        await req.authenticateUser.save();
        res.status(200).send("User Logout");

    }
    catch (err) {
        res.status(500).send(err);
    }

});




module.exports = router;