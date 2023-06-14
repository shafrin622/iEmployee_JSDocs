const db = require("../db/db");

async function GetEmployeeResume() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `select * from employeeresume`

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message))
                Success(res)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}

async function GetEmployeeResumeById(id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `select * from employeeresume where FKEmpId = ${Number.parseInt(id)}`

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message))
                Success(res)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}

async function InsertEmployeeResume(filename, id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `insert into employeeresume(resume,FKEmpId) values('${filename}', ${Number.parseInt(id)})`

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message))
                Success(res)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}

async function UpdateEmployeeResume(filename, id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `
            update employeeresume
            set resume = '${filename}'
            where FKEmpId = ${Number.parseInt(id)}
            `

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message))
                Success(res)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}

async function DeleteResume(fkid) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `delete from employeeresume where FKEmpId = ${Number.parseInt(fkid)}`

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message))
                Success(res)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}


module.exports = {
    GetEmployeeResume,
    GetEmployeeResumeById,
    InsertEmployeeResume,
    UpdateEmployeeResume,
    DeleteResume
}