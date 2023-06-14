const express = require('express')
const { DeleteEmployee, BuildProfile } = require('../config/StoredProcedures/Employees')
const { GetInitialData } = require('../config/StoredProcedures/GetInitials')
const router = express.Router()



router.get('/get-initial-data', (req, res) => {

    GetInitialData().then((result) => {

        res.json({
            Designations: result[0],
            Domains: result[1],
            PracticeAreas: result[2],
            Educations: result[3],
            Users: result[4],
            Roles: result[5],
            Clients: result[6],
            Employees: result[7]
        })

    }).catch((err) => res.json({ isSuccess: false }))

})


router.post('/delete_employee', (req, res) => {

    DeleteEmployee(req.body.Id).then(result => {

        res.json({ isSuccess: true })

    })
        .catch(error => res.json({ isSuccess: false }))

})


module.exports = router