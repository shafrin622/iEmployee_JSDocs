const express = require('express')
const router = express.Router()
const { uploadImage } = require('../config/Uploads/Uploads')

const Images = require('../config/Tables/ProfileImages')

router.get('/getprofileimages', (req, res) => {
    Images.GetProfileImage().then((data) => {
        res.json({ isSuccess: true, Images: data })
    })
})

router.get('/getprofileimage/:id', (req, res) => {

    if (req.params.id === 0 || req.params.id === undefined) {
        res.json({ data: [] })
    }
    else {
        Images.GetProfileImageById(req.params.id).then(data => {
            res.send(data)
        })
    }

})

router.post('/uploadimage', uploadImage, (req, res) => {

    const { filename } = req.file
    const { FKEmpId } = req.body

    Images.UploadProfileImage(filename, FKEmpId).then((data) => {
        res.json({ isSuccess: true, image: filename })
    })

})

router.post('/updateprofile', uploadImage, (req, res) => {

    const { filename } = req.file
    const { FKEmpId } = req.body

    Images.UpdateProfileImage(filename, FKEmpId).then((data) => {
        res.json({ isSuccess: true, image: filename })
    })

})

router.post('/deleteProfile', (req, res) => {
    Images.DeleteProfileImage(req.body.FKEmpId)
})


module.exports = router