const express = require("express")
const cors = require("cors")
const bodyParse = require("body-parser")
require('dotenv').config();

const Employees = require('./Routes/Employee')
const Designations = require('./Routes/Designations')
const Users = require('./Routes/Users')
const Domains = require('./Routes/Domains')
const Educations = require('./Routes/Educations')
const PracticeAreas = require('./Routes/PracticeArea')
const Images = require('./Routes/ProfileImage')
const EmployeeResumes = require('./Routes/EmployeeResume')
const Clients = require('./Routes/Clients')
const MailRouter = require('./Routes/MailRouter')
const Organization = require('./Routes/Organization')

const Procedures = require('./Routes/GetProcedures')

const Port = process.env.PORT || 8081


// Middlewares

const app = express()
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "https://iemployeegzui.azurewebsites.net"]
}))
app.use(express.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use('/Config/Uploads', express.static('./Config/Uploads'))


// Routes

app.use('/iemployee', Employees)
app.use('/iemployee', Users)
app.use('/iemployee', Designations)
app.use('/iemployee', Domains)
app.use('/iemployee', Educations)
app.use('/iemployee', PracticeAreas)
app.use('/iemployee', Images)
app.use('/iemployee', EmployeeResumes)
app.use('/iemployee', Clients)
app.use('/mail', MailRouter)
app.use('/iemployee', Organization)

app.use('/iemployee', Procedures)


app.get('/', (req, res) => {
    res.send(`
    <center>
        <h2>IEmployee</h2>
    </center>
    `)
})


app.get('/*', (req, res) => {
    res.send(`
    <div style="display: flex; justify-content: center; align-items: flex-start; height : 100vh">
        <h2 style="color: red;">Error 404 - Page Not Found </h2>
    </div>
    `)
})


app.listen(Port, () => {
    console.log("Server is running on the port " + Port)
})
