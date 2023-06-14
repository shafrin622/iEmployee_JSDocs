const db = require('../db/db')




const GetInitialData = () => {

    try {

        let response = new Promise((Success, Failed) => {

            const sqlQuery = `call sp_get_initials`

            db.query(sqlQuery, (err, result) => {

                if (err) Failed(new Error(err.message))
                Success(result)

            })

        })

        return response

    }
    catch (error) {
        console.log(error.message)
    }

}

module.exports = { GetInitialData }