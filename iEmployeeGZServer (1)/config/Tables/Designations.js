const db = require("../db/db");

async function GetDesignations() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = "select  * from designations"

            db.query(sqlQuery, (err, result) => {
                if (err) Rejected(new Error(err))
                Success(result)
            })

        })

        return response

    }
    catch (error) {
        console.log(error)
    }

}

async function InsertDepartment(departmentname, department) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `insert into ${departmentname}s(${departmentname}, comment) values('${department}','Adding ${department}')`

            db.query(sqlQuery, (err, result) => {
                if (err) Rejected(new Error(err))
                Success(result)
            })

        })

        return response

    }
    catch (error) {
        console.log(error)
    }

}

module.exports = {
    GetDesignations,
    InsertDepartment
}