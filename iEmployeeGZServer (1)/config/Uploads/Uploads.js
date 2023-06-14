const multer = require('multer')

const imageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Config/Uploads/Images')
    },
    filename: (req, file, callback) => {
        const dt = new Date();
        const extname = file.originalname.split('.')
        callback(null, `image-${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()}-${dt.getTime()}.${extname[extname.length - 1]}`)
    }
})

const imageFilter = (req, file, callback) => {
    callback(null, true)
}

const uploadImage = multer({
    storage: imageConfig,
    limits: { fileSize: '2048000' },
    fileFilter: imageFilter
}).single('image')

const resumeConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Config/Uploads/EmployeeResume')
    },
    filename: (req, file, callback) => {
        const dt = new Date();
        const extname = file.originalname.split('.')
        callback(null, `Employee-Resume-${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()}-${dt.getTime()}.${extname[extname.length - 1]}`)
    }
})

const resumeFilter = (req, file, callback) => {
    callback(null, true)
}

const uploadResume = multer({
    storage: resumeConfig,
    limits: {
        fileSize: 10240000
    },
    fileFilter: resumeFilter
}).single('resume')

module.exports = { uploadImage, uploadResume };