const db = require("../db/db");

async function GetProfileImage() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `select * from profileimages`

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

async function GetProfileImageById(id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `select * from profileimages where FKEmpId = ${Number.parseInt(id)}`

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

async function UploadProfileImage(filename, id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `insert into profileimages(image,FKEmpId) values('${filename}',${Number.parseInt(id)})`

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

async function UpdateProfileImage(filename, id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `
            
            update profileimages
            set image='${filename}'
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

async function DeleteProfileImage(id) {

    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `delete from profileimages where FKEmpId = ${Number.parseInt(id)}`

            db.query(sqlQuery, (err, result) => {
                if (err) Failed(new Error(err.message))
                Success(result)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error.message)
    }

}


module.exports = {
    GetProfileImage,
    GetProfileImageById,
    UpdateProfileImage,
    UploadProfileImage,
    DeleteProfileImage
}