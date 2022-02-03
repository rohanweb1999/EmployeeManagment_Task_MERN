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

router.get('/getUser', authenticate, async (req, res) => {
    try {

        let { Page, Sort, Request } = req.query;
        let limit = 4;
        let skip = (Page - 1) * limit;
        const total = await User.countDocuments({}); // count total Documents

        let totalPage = Math.ceil(total / limit); // count Total page


        let aggregateQuery = []; //Aggreagte Array

        aggregateQuery.push(
            {
                $addFields: {
                    totalSalary: {
                        $add: ["$salaryJan", "$salaryFeb", "$salaryMar"]
                    }
                }
            },
            {
                $lookup: {
                    from: "countries",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "country"
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
            },
        )

        if (Request === "") {
            aggregateQuery.push(
                { $sort: { firstName: Sort === "descending" ? -1 : 1 } },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
            const users = await User.aggregate([aggregateQuery]);

            res.send({ users, totalPage });

        }

        else if (Request !== "") {
            const searchUser = Request;
            console.log(searchUser)
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { firstName: RegExp("^" + searchUser, 'i') },
                            { lastName: RegExp("^" + searchUser, 'i') },
                            { profession: RegExp("^" + searchUser, 'i') },
                            { company: RegExp("^" + searchUser, 'i') },
                            { email: RegExp("^" + searchUser, 'i') },
                            { contact: parseInt(searchUser) },
                            { "country.countryName": RegExp("^" + searchUser, 'i') },
                            { "state.stateName": RegExp("^" + searchUser, 'i') },
                            { "city.cityName": RegExp("^" + searchUser, 'i') }
                        ]
                    }
                },
                { $sort: { firstName: Sort === "descending" ? -1 : 1 } },

                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
            const users = await User.aggregate([aggregateQuery]);
            let totalPage = Math.ceil(users.length / limit);
            res.send({ users, totalPage });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});




//register route
router.post('/signUp', async (req, res) => {
    const userData = req.body
    try {
        const userExist = await User.findOne({ email: userData.email })
        if (userExist) {
            res.send("user Already Exist")
        } else {
            const result = await User(userData).save();
            res.send("Register Sucessfuly")

        }

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
        aggregateQuery = []
        aggregateQuery.push({
            $lookup: {
                from: "countries",
                localField: "countryId",
                foreignField: "_id",
                as: "country"
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
            })
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
        res.send("Delete Record")
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