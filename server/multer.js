const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cd(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cd(null, new Date().toISOString() + '-' + file.originalname)
    }
})

//////file validation ////

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cd(null, true)
    }
    else {
        cd({ message: 'unsupported file Formet' }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})

module.exports = upload;