const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require('../models/userSchema');

router.get("/dashboard/getData/page=:pageNumber/:sortBy", async (req, res) => {
    try {
        aggregateQuery = []
        const { pageNumber, sortBy } = req.params
        let size = 3

        if (pageNumber) {
            aggregateQuery.push({ $skip: (pageNumber - 1) * size },
                { $limit: parseInt(size) })
        }
        if (sortBy === 'ascending' || sortBy === 'descending') {
            console.log("ascending")
            aggregateQuery.push({ "$sort": { "firstName": sortBy === "ascending" ? 1 : -1 } })
        } else {
            aggregateQuery.push({
                // $match: { $or: [{ firstName: sortBy }, { salaryJan: parseInt(sortBy) }] }
                $match: {
                    $or: [

                        // { firstName: { $regex: '^' + sortBy } }
                        {
                            "firstName": RegExp("^" + sortBy, "i")
                        },
                        {
                            "salaryJan": RegExp(parseInt.sortBy)
                        }
                    ]
                }

            })
        }
        console.log(aggregateQuery)
        const users = await User.aggregate(aggregateQuery, { collation: { locale: "en", strength: 1 } })
        console.log("users", users)
        res.send(users)
    }
    catch (err) {
        console.log("error: ", err);
        res.send("error" + err);
    }
});



//register route
router.post('/signUp', async (req, res) => {

    const user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
        profession: req.body.profession,
        salaryJan: req.body.salaryJan,
        salaryFeb: req.body.salaryFeb,
        salaryMar: req.body.salaryMar,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        token: req.body.token

    })
    try {

        const usersData = await user.save();
        res.send((usersData))
        // console.log("data added", usersData);
    }
    catch (err) {
        console.log("error: ", err)
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
        console.log(err);

    }
})

//get user for edit
router.get('/editUser/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        console.log("get request for a emp", user);
        res.send(user)
    }
    catch (err) {
        console.log("error: ", err)
        res.send("error" + err)
    };
});

//update user
router.put('/updateUser/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;

        const e1 = await user.save();
        res.send((e1));
    }
    catch (err) {
        console.log("error: ", err)
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
        console.log("error: ", err)
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
        //remove token from database
        // console.log("req.authenticateUser.Tokens", req.authenticateUser.Token);

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