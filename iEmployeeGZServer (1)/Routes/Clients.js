const express = require('express')
const router = express.Router()
const Client = require('../config/Tables/Clients')

router.get('/get-clients', (req, res) => {

    Client.GetClients().then((result) => {
        if (result.length !== 0) {
            res.json({ isSucess: true, Clients: result })
        }
        else {
            res.json({ isSuccess: false })
        }
    })

})

router.post('/insert-client', (req, res) => {

    const { clientName, typeOfContract, genzeonPOC, clientPOC, projectManagerId } = req.body

    Client.InsertClient(clientName, typeOfContract, genzeonPOC, clientPOC, projectManagerId)
        .then((result) => {
            if (result.protocol41) {
                res.json({ isSuccess: true })
            }
            else {
                res.json({ isSuccess: false })
            }
        })

})

router.post('/get-by-client', (req, res) => {
    Client.GetClientById(req.body.id).then((result) => {
        if (result.length !== 0) {
            res.json({ isSuccess: true, ClientData: result })
        }
    })
})

router.post('/remove-client', (req, res) => {
    const { Id } = req.body
    Client.DeleteClient(Id).then((result) => {
        if (result.protocol41) {
            res.json({ isSuccess: true })
        }
        else {
            res.json({ isSuccess: false })
        }
    })
})

router.post('/update-client', (req, res) => {

    const { Id, clientName, typeOfContract, genzeonPOC, clientPOC, projectManagerId } = req.body

    Client.UpdateClient(Id, clientName, typeOfContract, genzeonPOC, clientPOC, projectManagerId)
        .then((result) => {
            res.json({ isSuccess: true })
        })
})


// Employee Client table

router.get('/get-employee-client', (req, res) => {
    Client.GetEmployeeClients().then((result) => {
        res.json({ isSuccess: true, EmpClient: result })
    })
})

router.post('/get-employee-client-ByEmployee', (req, res) => {
    Client.GetEmployeeClientByFKId(req.body.FKId).then((data) => {
        if (data.length !== 0) {
            res.json({ isSuccess: true, ClientId: data })
        }
        else {
            res.json({ isSuccess: false })
        }
    })
})

router.post('/insert-employee-client', (req, res) => {

    const { FKEmpId, FKClientId, Billable } = req.body

    Client.InsertEmployeeClient(FKEmpId, FKClientId, Billable).then((result) => {
        res.send(result)
    })

})

router.post('/update-employee-client', (req, res) => {

    const { FKEmpId, FKClientId, Billable } = req.body

    Client.UpdateEmployeeClient(FKEmpId, FKClientId, Billable).then((data) => {
        if (data.protocol41) {
            res.json({ isSuccess: true })
        }
        else {
            res.json({ isSuccess: false })
        }
    })
})

router.post('/delete-employee-client', (req, res) => {
    const { FKId } = req.body

    Client.DeleteEmployeeClient(FKId).then((data) => res.json({ isSuccess: true }))

})

module.exports = router