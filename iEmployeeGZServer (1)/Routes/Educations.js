const express = require('express')
const router = express.Router()

const Education = require('../config/Tables/Educations')

router.get("/educations", (req, res) => {

    Education.GetEducations().then(data => res.send(data))

})


module.exports = router