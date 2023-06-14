const db = require("../db/db");



async function GetOrganization() {
    try {
        const response = await new Promise((Success, Rejected) => {
            const sqlQuery = `Select * from organization`
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


async function InsertOrg(organization) {
    try {
        let response = await new Promise((Success, Rejected) => {
            const sqlQuery = `Insert into organization(organization) values('${organization}')`
            db.query(sqlQuery, (err, result) => {
                if (err) Rejected(new Error(err))
                Success(result)
            })
        })
        return response;
    }
    catch (error) { console.log(error) }
}



module.exports = { GetOrganization, InsertOrg };