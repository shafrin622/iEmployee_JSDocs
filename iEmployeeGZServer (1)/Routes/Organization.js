const express = require('express')
const router = express.Router();
const Organization = require('../config/Tables/Organization.js');


router.get("/getorganization", (req, res) => {

    Organization.GetOrganization().then((data) => {
        res.json({ isSuccess: true, Organization: data })
    })

})

router.post("/insertorg", (req, res) => {
    const organization = req.body.company;
    Organization.InsertOrg(organization).then((data) => res.json({ isSuccess: true }))
})

module.exports = router;