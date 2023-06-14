const db = require("../db/db");



async function GetEducations() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = "select  * from educations"

            db.query(sqlQuery, (err, result) => {
                if (err) Rejected(new Error(err))
                Success(result)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}

module.exports = {
    GetEducations
}