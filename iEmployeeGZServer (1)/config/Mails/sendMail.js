const { createTransport } = require('nodemailer')

async function SendMail(tomail, toSubject, message) {

    let transport = createTransport({
        service: "gmail",
        auth: {
            user: process.env.SECURE_MAIL_ADDRESS,
            pass: process.env.SECURE_MAIL_PASSWORD
        },

    })

    let mailOptions = {
        from: "iEmployee",
        to: tomail,
        subject: toSubject,
        text: message
    }

    return await transport.sendMail(mailOptions)

}

module.exports = { SendMail }