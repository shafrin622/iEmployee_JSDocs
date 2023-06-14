const db = require("../db/db")
const bcrypt = require('bcrypt')

async function GetUser() {

    try {
        const response = await new Promise((Success, Rejected) => {
            const sqlQuery = "select * from users"

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

async function GetUserAndRoles() {

    try {

        let response = await new Promise((Success, Rejected) => {
            const sqlQuery = `
            select user.Id,username, email, password, countryCode,phoneNumber, organization,
            role, user.FKRoleId, FKEmpId,user.IsApprove
            from users as user
            inner join roles as role
            on user.FKRoleId = role.Id
            order by user.username
            `;
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

async function GetUserById(id) {

    try {

        let response = await new Promise((Success, Rejected) => {
            const sqlQuery = `
            select user.Id,username, email, password,countryCode,
            phoneNumber, organization, role, user.FKRoleId, user.FKEmpId
            from users as user
            inner join roles as role
            on user.FKRoleId = role.Id
            where user.Id = ${Number.parseInt(id)}
            `
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

async function GetUserByUsername(username) {

    try {

        let response = await new Promise((Success, Rejected) => {
            const sqlQuery = `
            select user.Id,username, email, password,countryCode,
            phoneNumber, organization, role, user.FKRoleId, user.FKEmpId,user.IsApprove
            from users as user
            inner join roles as role
            on user.FKRoleId = role.Id
            where user.username = '${username}'
            `
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

async function UpdateIsApprove(id) {
    try {
        let response = await new Promise((Success, Rejected) => {
            const sqlQuery = `update users
             set IsApprove = ${1}
             where Id=${Number.parseInt(id)} `
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

async function InsertUserData(username, email, password, countryCode, phoneNumber, org, role, IsApprove) {

    try {

        // Encryption of Password
        let hashPassword = await bcrypt.hash(password, 5)

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `Insert into users(Username, Email, Password,countryCode, PhoneNumber, Organization, FKRoleId, FKEmpId,IsApprove)
            values('${username}','${email}','${hashPassword}','${countryCode}',${phoneNumber},'${org}',${role}, ${0}, ${IsApprove})`

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

async function GetUserRoles() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = "select * from roles"

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

async function UpdateUserById(id, username, email, phoneNumber, countryCode, FKRoleId) {

    try {

        let response = await new Promise((Success, Rejected) => {

            let sqlQuery =
                `
                update users 
                set username = '${username}', email = '${email}',
                phoneNumber = ${Number.parseInt(phoneNumber)},
                countryCode = ${countryCode},
                FKRoleId = ${Number.parseInt(FKRoleId)}
                where Id = ${Number.parseInt(id)}
            `
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

async function UpdateUserPassword(username, password) {

    try {

        let response = await new Promise((Success, Rejected) => {

            let sqlQuery =
                `
                update users 
                set password = '${password}'
                where username = '${username}'

            `
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

async function AlterUser(Id, EmpId) {
    try {

        let response = await new Promise((Success, Rejected) => {

            let sqlQuery =
                `
            update users
            set FKEmpId = ${Number.parseInt(EmpId)}
            where Id = ${Number.parseInt(Id)}
            `

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

async function UpdateEmpId(FKEmpId) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `select Id from users where FKEmpId = ${Number.parseInt(FKEmpId)}`

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message))
                else {
                    res.forEach((e) => {
                        const updateQuery = `update users set FKEmpId = ${0} where Id = ${Number.parseInt(e.Id)}`
                        db.query(updateQuery, (error, result) => {
                            if (error) Rejected(new Error(error.message))
                            Success(result)
                        })
                    })
                }
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}

async function DeleteUser(id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `delete from users where Id = ${Number.parseInt(id)}`

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


async function CheckEmailAddress(mail) {

    try {
        const response = await new Promise((Success, Rejected) => {
            const sqlQuery = `select * from users where email = '${mail}'`

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
    GetUser,
    GetUserAndRoles,
    GetUserById,
    GetUserByUsername,
    InsertUserData,
    GetUserRoles,
    UpdateUserById,
    AlterUser,
    UpdateEmpId,
    DeleteUser,
    UpdateIsApprove,
    CheckEmailAddress,
    UpdateUserPassword
};