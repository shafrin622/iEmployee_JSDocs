const db = require("../db/db");


async function GetPracticeAreas() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = "select  * from practiceareas"

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
    GetPracticeAreas,
}