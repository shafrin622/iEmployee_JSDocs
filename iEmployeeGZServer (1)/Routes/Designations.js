const express = require('express')
const router = express.Router()

const Designations = require('../config/Tables/Designations')


router.get("/designations", (req, res) => {

    Designations.GetDesignations().then(data => res.send(data))

})

router.post('/addDepartment', (req, res) => {

    Designations.InsertDepartment(req.body.Departmentname, req.body.Department)
        .then((data) => res.json({ Id: data.insertId }))

})


module.exports = router