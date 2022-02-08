const cloudinary = require('cloudinary')

const dotenv = require('dotenv')

dotenv.config()
coundinary.config({
    cloud_Name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})