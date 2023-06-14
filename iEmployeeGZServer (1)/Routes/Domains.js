const express = require('express')
const router = express.Router()


const Domains = require('../config/Tables/Domains')

router.get("/domains", (req, res) => {

    Domains.GetDomains().then(data => res.send(data))

})

router.get('/getdomainsbyid/:id', (req, res) => {
    Domains.GetDomainsById(req.params.id).then(data => res.send(data))
})

router.get('/employeeDomains', (req, res) => {
    Domains.GetEmployeeDomains().then((result) => {
        res.json({ isSuccess: true, empDomains: result })
    })
})

router.post('/add-domain', (req, res) => {
    const { domain, comment } = req.body

    Domains.InsertDomain(domain, comment).then((data) => {
        if (data.protocol41) {
            res.json({ isSuccess: true, DomainId: data.insertId })
        }
        else {
            res.json({ isSuccess: false })
        }
    })

})

router.post('/postdomains', (req, res) => {

    Domains.InsertEmpDomain(req.body.FKEmpId, req.body.FKDomainId, req.body.domainExp)

})

router.post('/updatedomains', (req, res) => {

    Domains.UpdateDomains(req.body.FKEmpId, req.body.domainId, req.body.domainExp)

})

router.post('/deletedomain', (req, res) => {
    Domains.DeleteDomainById(req.body.Id)

})

router.post('/delete-domains-with-employee-id', (req, res) => {

    Domains.DeleteDomainByEmployeeId(req.body.FKEmpId)

})



module.exports = router