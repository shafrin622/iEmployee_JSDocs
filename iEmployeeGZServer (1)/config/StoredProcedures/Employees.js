const db = require('../db/db')


const BuildProfile = (firstname, lastname, email, phoneNumber, countryCode, designationId, practiceAreaId, educationId, specialization, certifications, careerHighlights, careerStartDate) => {

    try {

        let response = new Promise((Success, Failed) => {

            const sqlQuery = `call sp_build_profile('${firstname}','${lastname}','${email}', ${Number.parseInt(phoneNumber)}, ${Number.parseInt(countryCode)},
            ${Number.parseInt(designationId)},${Number.parseInt(practiceAreaId)},${Number.parseInt(educationId)},'${specialization}','${certifications}','${careerHighlights}',
            '${careerStartDate}'
            )`

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

const DeleteEmployee = (id) => {

    try {

        let response = new Promise((Success, Failed) => {

            const sqlQuery = `call sp_Delete_Employee(${Number.parseInt(id)})`

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

module.exports = { BuildProfile, DeleteEmployee }