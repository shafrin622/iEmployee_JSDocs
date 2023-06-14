const db = require("../db/db");

const GetClients = async () => {
    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `
            select  *
            from clients 
            `
            db.query(sqlQuery, (err, result) => {
                if (err) Failed(new Error(err.message))
                Success(result)
            })

        })

        return response

    }
    catch (error) {
        console.log(error.message);
    }
}

const GetClientById = async (id) => {
    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `
            select  * from clients
            where Id = ${Number.parseInt(id)}
            `

            db.query(sqlQuery, (err, result) => {
                if (err) Failed(new Error(err.message))
                Success(result)
            })

        })

        return response

    }
    catch (error) {
        console.log(error.message);
    }
}

const InsertClient = async (clientName, typeOfContract, genzeonPOC, clientPOC, projectManagerId) => {
    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `
            
            insert into clients(ClientName,TypeOfContract,GenzeonPOC,ClientPOC,ProjectManager)
            values('${clientName}','${typeOfContract}','${genzeonPOC}',
            '${clientPOC}', '${projectManagerId}'
            )

            `

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

const UpdateClient = async (id, clientname, typeofcontract, genzeonpoc, clientpoc, projectmanager) => {

    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `
            
            update clients 
            set ClientName = '${clientname}',
            TypeOfContract = '${typeofcontract}',
            GenzeonPOC = '${genzeonpoc}',
            ClientPOC = '${clientpoc}',
            ProjectManager = '${projectmanager}'
            where Id = ${Number.parseInt(id)}
            `

            db.query(sqlQuery, (err, result) => {
                console.log(err)
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

const DeleteClient = async (id) => {
    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `delete from clients where Id = ${Number.parseInt(id)}`

            db.query(sqlQuery, (err, result) => {
                if (err) Failed(new Error(err.message))
                Success(result)
            })

        })

        return response

    }
    catch (error) {
        console.log(error.message);
    }
}


// Employee Client Table

const GetEmployeeClients = async () => {

    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `select * from employee_client`

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

const GetEmployeeClientByFKId = async (id) => {
    try {

        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `select * from employee_client where FKEmpId = ${Number.parseInt(id)}`

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

const InsertEmployeeClient = async (FKEmpId, FKClientId, Billable) => {

    try {
        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `
            insert into employee_client(FKEmpId, FKClientId, Billable)
            values(${Number.parseInt(FKEmpId)}, ${Number.parseInt(FKClientId)}, ${Number.parseInt(Billable)})
            `

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

const UpdateEmployeeClient = async (FKEmpId, FKClientId, Billable) => {

    try {
        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `
            update employee_client 
            set FKClientId=${Number.parseInt(FKClientId)},
            Billable=${Number.parseInt(Billable)}
            where FKEmpId = ${Number.parseInt(FKEmpId)}
            `

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

const DeleteEmployeeClient = async (FKId) => {
    try {
        let response = await new Promise((Success, Failed) => {

            const sqlQuery = `
            delete from employee_client 
            where FKEmpId = ${Number.parseInt(FKId)}
            `

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

module.exports = {
    GetClients,
    GetClientById,
    InsertClient,
    UpdateClient,
    DeleteClient,
    GetEmployeeClients,
    GetEmployeeClientByFKId,
    InsertEmployeeClient,
    UpdateEmployeeClient,
    DeleteEmployeeClient
} 