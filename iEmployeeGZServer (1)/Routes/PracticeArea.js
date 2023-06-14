const express = require('express')
const router = express.Router()

const PracticeArea = require('../config/Tables/PracticeArea')


router.get("/practicearea", (req, res) => {

    PracticeArea.GetPracticeAreas().then(data => res.send(data))

})

module.exports = router