const db = require("../db/db");


async function GetDomains() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = "select  * from domains"

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

async function GetEmployeeDomains() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = "select  * from emp_domain"

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

async function GetDomainsById(id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `
            select emp.Id, emp.FKEmpId,
            emp.FKDomainId, dom.domain,
            emp.domainExp
             from emp_domain as emp
            inner join domains as dom
            on dom.Id = emp.FKDomainId
            where emp.FKEmpId = ${Number.parseInt(id)}
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

async function InsertEmpDomain(FKEmpId, FKDomainId, domainExp) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = ` 
            insert into 
            emp_domain(FKEmpId, FKDomainId, domainExp)
            values(${Number.parseInt(FKEmpId)} , ${Number.parseInt(FKDomainId)} , ${Number.parseInt(domainExp)})
            `

            db.query(sqlQuery, (err, result) => {
                if (err) Rejected(new Error(err.message))
                Success(result)
            })
        })

        return response

    }
    catch (error) {
        console.log(error)
    }

}

async function InsertDomain(domain, comment) {
    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = ` 
            insert into 
            domains(domain, comment)
            values('${domain}','${comment} is added')
            `

            db.query(sqlQuery, (err, result) => {
                if (err) Rejected(new Error(err.message))
                Success(result)
            })
        })

        return response

    }
    catch (error) {
        console.log(error)
    }
}

async function UpdateDomains(FKEmpId, domainId, domainExp) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery =
                `
            insert into emp_domain(FKEmpId, FKDomainId, domainExp)
            values(${Number.parseInt(FKEmpId)}, ${Number.parseInt(domainId)}, ${Number.parseInt(domainExp)})
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

async function DeleteDomainById(id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `delete from emp_domain where Id = ${Number.parseInt(id)}`

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message + "\n"))
                Success(res)
            })

        })

        return response;

    }
    catch (error) {
        console.log(error)
    }

}

async function DeleteDomainByEmployeeId(id) {
    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `delete from emp_domain where FkEmpId = ${Number.parseInt(id)}`

            db.query(sqlQuery, (err, res) => {
                if (err) Rejected(new Error(err.message + "\n"))
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
    GetDomains,
    GetEmployeeDomains,
    GetDomainsById,
    InsertDomain,
    InsertEmpDomain,
    UpdateDomains,
    DeleteDomainById,
    DeleteDomainByEmployeeId
}