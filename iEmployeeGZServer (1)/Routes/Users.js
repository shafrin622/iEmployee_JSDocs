const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Users = require("../config/Tables/Users")



router.get("/getuser", (req, res) => {

    Users.GetUser().then((data) => {
        res.json({ isSuccess: true, UserData: data })
    })

})

router.get("/getuserrole", (req, res) => {

    Users.GetUserAndRoles().then((data) => {
        res.send(data)
    })

})

router.post('/check-email', (req, res) => {

    Users.CheckEmailAddress(req.body.MailAddress).then((result) => {
        if (result.length !== 0) {

            res.json({ isSuccess: true, Username: result[0].username })

        }
        else {
            res.json({ isSuccess: false, message: "Invalid User" })
        }
    })

})

// User Login

router.post('/login', (req, res) => {

    const { Username, Password } = req.body

    Users.GetUserByUsername(Username).then((userData) => {
        if (userData.length !== 0) {

            if (userData[0].IsApprove === 1) {
                bcrypt.compare(Password, userData[0].password).then((data) => {
                    if (data) {
                        res.json({ isSuccess: true, User: userData })
                    }
                    else {
                        res.json({ isSuccess: false, "error_type": "invalid" })
                    }
                })
            }
            else {
                res.json({ isSuccess: false, "error_type": "notapproved" })
            }
        }
        else {
            res.json({ isSuccess: false, "error_type": "invalid" })
        }
    })

})

router.get("/getuserbyid/:id", (req, res) => {


    if (req.params.id === 0 || req.params.id === "NaN" || req.params.id === 'undefined') {
        res.json({ isSuccess: false })
    }
    else {
        Users.GetUserById(req.params.id).then((data) => {
            res.json({ isSuccess: true, UserData: data })
        })
    }

})

router.post("/insertuser", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const countryCode = req.body.countryCode;
    const phoneNumber = req.body.phoneNumber;
    const org = req.body.org;
    const role = req.body.role;

    Users.InsertUserData(username, email, password, countryCode, phoneNumber, org, role, req.body.IsApprove)
        .then((data) => res.json({ isSuccess: true }))

})

router.post('/updateUser', (req, res) => {

    Users.UpdateUserById(req.body.Id, req.body.userName,
        req.body.email, req.body.phoneNumber, req.body.countryCode, req.body.FKRoleId).then((data) => {
            res.json({ isSuccess: true })
        })

})

router.post('/update-is-approve', (req, res) => {
    Users.UpdateIsApprove(req.body.Id).then((data) => {
        res.json({ isSuccess: true })
    })
})

router.post('/update-password', (req, res) => {

    const { Username, Password } = req.body

    bcrypt.hash(Password, 5).then((result) => {

        Users.GetUserByUsername(Username).then((user) => {

            if (user.length !== 0) {

                Users.UpdateUserPassword(Username, result).then((response) => {
                    res.json({ isSuccess: true, message: "Successfully Updated the Password..!" })
                })

            }
            else {
                res.json({ isSuccess: false, message: "Invalid Credentails..!" })
            }

        })

    })



})

router.post('/alterempid', (req, res) => {

    Users.AlterUser(req.body.Id, req.body.EmpId)

})

router.post('/updateempid', (req, res) => {

    Users.UpdateEmpId(req.body.FKEmpId).then((data) => res.json({ isSuccess: true }))

})

router.post('/deleteuser', (req, res) => {

    Users.DeleteUser(req.body.Id).then((data) => res.json({ isSuccess: true }))

})

// Roles

router.get('/getroles', (req, res) => {

    Users.GetUserRoles().then((data) => {
        res.send(data)
    })

})


module.exports = router