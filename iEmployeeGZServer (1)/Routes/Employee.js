const express = require('express')
const router = express.Router()

const Employee = require('../config/Tables/Employee')


router.get('/getemployees', (req, res) => {

    Employee.GetEmployees().then(data => {
        res.json({ isSuccess: true, empData: data })
    })

})

router.get("/getbyidemployee/:id", (req, res) => {

    if (req.params.id === 0 || req.params.id === undefined) {
        res.json({ data: [] })
    }
    else {
        Employee.GetEmployeeById(req.params.id).then(data => res.send(data))
    }

})

router.post("/postemployee", (req, res) => {
    Employee.InsertEmployeeDetails(req.body.firstname,
        req.body.lastname, req.body.email,
        req.body.phoneNumber, req.body.countryCode,
        req.body.designationId,
        req.body.practiceAreaId, req.body.educationId,
        req.body.specialization, req.body.certifications,
        req.body.careerHighlights, req.body.careerStartDate)
        .then((data) => {
            res.json({ Id: data.insertId, submitted: data.protocol41 })
        })

})

router.post('/updateemployee', (req, res) => {

    Employee.UpdateEmployeeDetails(req.body.Id, req.body.firstName,
        req.body.lastName, req.body.email,
        req.body.phoneNumber, req.body.designationId,
        req.body.practiceAreaId, req.body.educationId,
        req.body.specialization, req.body.certifications,
        req.body.careerHighlights, req.body.careerStartDate
    ).then((data) => {
        res.json({ isSuccess: true }
        )
    })

})

router.post('/deleteemployee', (req, res) => {
    Employee.DeleteEmployeeById(req.body.Id).then((data) => res.json({ isSuccess: true }))

})

module.exports = router