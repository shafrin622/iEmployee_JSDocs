const express = require('express')
const { SendMail, SendOutlookMail } = require('../config/Mails/sendMail')
const router = express.Router()


router.post('/send-mail', (req, res) => {

    const { toMail, toSubject, toMessage } = req.body

    let result = SendMail(toMail, toSubject, toMessage)
    result.then((response) => {
        res.json({ isSuccess: true, message: "Successfully sent...!" })
    }).catch((err) => {
        res.json({ isSuccess: false })
    })

})

module.exports = router