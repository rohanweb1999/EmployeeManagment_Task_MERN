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
const upload = require('../multer')
const cloudinary = require('../cloudinary')
const path = require('path');

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
        let limit = 2;
        let skip = (Page - 1) * limit;
        const loginAuthenticateUser = req.authenticateUser
        let loginstate = true

        let aggregateQuery = [];

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

        if (Request !== "") {

            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { firstName: RegExp("^" + Request, 'i') },
                            { lastName: RegExp("^" + Request, 'i') },
                            { profession: RegExp("^" + Request, 'i') },
                            { email: RegExp("^" + Request, 'i') },
                            { contact: parseInt(Request) },
                            { "country.countryName": RegExp("^" + Request, 'i') },
                            { "state.stateName": RegExp("^" + Request, 'i') },
                            { "city.cityName": RegExp("^" + Request, 'i') }
                        ]
                    }
                },
            )

            const matchUser = await User.aggregate([aggregateQuery]);

            let totalPage = Math.ceil(matchUser.length / limit);

            aggregateQuery.push(
                { $sort: { firstName: Sort === "ascending" ? -1 : 1 } },

                {
                    $skip: skip
                },
                {
                    $limit: limit
                }

            )

            const users = await User.aggregate([aggregateQuery])
            res.send({ users, totalPage, loginAuthenticateUser, loginstate });
        }
        else if (Request === "") {

            const total = await User.countDocuments({});

            let totalPage = Math.ceil(total / limit);

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

            res.send({ users, totalPage, loginAuthenticateUser, loginstate });
        }

    }
    catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
});



//register route
router.post('/signUp', async (req, res) => {
    const userData = req.body
    try {
        const userExist = await User.findOne({ email: userData.email })
        if (userExist) {
            res.status(400).send({ error: "user Already Exist" })
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

        // if (!email || !password) {
        //     return res.status(400).send({ error: "please filled the data field!" });
        // }
        const userLogin = await User.findOne({ email: email, password: password });

        if (userLogin) {
            // const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();

            //store the token in cookie
            res.cookie("jwtLogin", token, {
                expires: new Date(Date.now() + 3600000)
            });
            let loginstate = true
            res.send({ msg: "Login Sucessfully", loginstate });
        }
        else {
            res.status(400).send({ error: "Invalid Password or Email" })
        }

    } catch (err) {
        res.send("err" + err)
    }
})

//get user for edit
router.get('/editUser/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        res.send(user)
    }
    catch (err) {
        res.send("error" + err)
    };
});

//update user
router.put('/updateUser/:id/:email', async (req, res) => {
    try {
        let id = req.params.id;
        let email = req.params.email;
        let updatedValue = req.body
        if (updatedValue.email !== email) {
            const emailExist = await User.findOne({ email: updatedValue.email });

            if (emailExist) {
                return res.status(400).send({ error: "This Email is already taken" });
            }
            else {
                //============================= Save Employee Updated Details =============================
                await User.findByIdAndUpdate(id, updatedValue,
                    {
                        new: false
                    },
                );

                //============================= Send Response =============================
                res.json({ msg: "Employee Updated Sucessfully!" })
            }
        }
        else {

            //============================= Save Employee Updated Details =============================
            await User.findByIdAndUpdate(id, updatedValue,
                {
                    new: false
                },
            );

            //============================= Send Response =============================
            res.json({ msg: "Employee Updated Sucessfully!" })
        }


    }
    catch (err) {
        res.send("error" + err)
    };
});

//delete user
router.delete('/deleteUser/:email', authenticate, async (req, res) => {

    try {
        if (req.authenticateUser.email === req.params.email) {
            //============================= Clear Cookie =============================
            res.clearCookie("jwtLogin");
            const loginStatus = true
            //============================= Delete Employee =============================
            await User.findOneAndDelete({ email: req.params.email });
            //============================= Send Response =============================
            res.send(loginStatus)
        }
        else {
            const loginStatus = false
            //============================= Delete Employee =============================
            await User.findOneAndDelete({ email: req.params.email });
            //============================= Send Response =============================
            res.send(loginStatus)
        }
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
router.post('/upload-files', authenticate, upload.array('multi-files'), async (req, res) => {

    try {

        const files = req.files;
        const unSupportedFiles = [];
        for (const file of files) {

            const type = path.extname(file.originalname)
            if (type !== '.jpg' && type !== '.jpeg' && type !== '.png' && type !== '.pdf' && type !== '.doc' && type !== '.txt' && type !== '.docx') {
                unSupportedFiles.push(file.originalname)
            }
            else {
                const uploadFiles = await cloudinary.uploader.upload(file.path, { resource_type: 'raw' });
                const File = {
                    filename: file.originalname,
                    filepath: uploadFiles.secure_url,
                    filetype: type,
                    public_id: uploadFiles.public_id,

                }

                await User.updateOne({ email: req.authenticateUser.email }, { $push: { Files: File } });
            }
        }
        const loader = false
        // res.send({ msg: "File  Uploaded Succeessfully!! ", loader });

        res.send({ msg: "File Uploaded Succeessfully!!", loader, unSupportedFiles });

    }
    catch (err) {
        res.status(400).send({ error: "File Not Upload" })

    }
})
//**********  fetch files user uploaded */
router.get('/fetchFiles', authenticate, async (req, res) => {

    try {
        let { Page } = req.query;
        let limit = 5
        let skip = (Page - 1) * limit
        const totalFiles = req.authenticateUser.Files;
        const loginAuthenticateUser = req.authenticateUser

        let totalPage = Math.ceil(totalFiles.length / limit);
        const aggreagteQuery = [];

        aggreagteQuery.push(

            {
                $match: {
                    Files: req.authenticateUser.Files
                }
            },
            {
                $project: {
                    _id: 0, getFiles: {
                        $slice: ["$Files", skip, limit]
                    },
                }
            },
        );
        const result = await User.aggregate([aggreagteQuery]);

        res.send({ result, totalPage, loginAuthenticateUser })

    } catch (err) {
        res.send(err);
    }
})
router.delete('/deleteFile/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const xyz = await cloudinary.uploader.destroy(id, { invalidate: true, resource_type: "raw" });
        const result = await User.updateOne(
            { email: req.authenticateUser.email },
            { $pull: { Files: { _id: id } } }
        )
        res.send({ msg: "delete successfully!" })
    } catch (err) {
        res.send(err);
    }
})
router.put(`/deleteMultiFiles`, authenticate, async (req, res) => {

    try {

        const ids = req.body;

        for (const id of ids) {

            const database = await User.updateOne(
                { email: req.authenticateUser.email },
                { $pull: { Files: { _id: id } } }
            )

        }
        res.send({ msg: "Multiple Files Deleted Sucessfully" })

    } catch (err) {
        res.send(err);
    }
})






module.exports = router;