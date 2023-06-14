const express = require('express')
const router = express.Router()
const { uploadResume } = require('../config/Uploads/Uploads')

const EmpResume = require('../config/Tables/EmployeeResume')

router.get('/get-employee-resumes', (req, res) => {
    EmpResume.GetEmployeeResume().then((data) => {
        res.send(data)
    })
})

router.post('/uploadResume', uploadResume, (req, res) => {

    const { filename } = req.file
    const { FKEmpId } = req.body

    EmpResume.GetEmployeeResumeById(FKEmpId).then((data) => {
        if (data.length === 0) {
            EmpResume.InsertEmployeeResume(filename, FKEmpId).then((data) => {
                if (data.protocol41) {
                    EmpResume.GetEmployeeResumeById(FKEmpId).then((result) => {
                        res.json({ isSuccess: true, EmpResume: result, message: "Successfully Uploaded" })
                    })
                }
            })
        }
        else {
            EmpResume.UpdateEmployeeResume(filename, FKEmpId).then((data) => {
                if (data.protocol41) {
                    EmpResume.GetEmployeeResumeById(FKEmpId).then((result) => {
                        res.json({ isSuccess: true, EmpResume: result, message: "Update Successful" })
                    })
                }
            })
        }
    })



})

router.post('/getResumeById', (req, res) => {
    EmpResume.GetEmployeeResumeById(req.body.FKEmpId).then((data) => {
        if (data.length === 0) {
            res.json({ isSuccess: false, message: "Data Not Found" })
        }
        else {
            res.json({ isSuccess: true, EmpResume: data, message: "Data Found" })
        }
    })
})

router.post('/delete-resume', (req, res) => {

    EmpResume.DeleteResume(req.body.FKId).then(data => {
        res.json({ isSuccess: true })
    })

})


module.exports = router