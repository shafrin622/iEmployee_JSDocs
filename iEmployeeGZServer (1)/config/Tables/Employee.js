const db = require("../db/db");


async function GetEmployees() {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `
            select emp.Id, emp.firstName, emp.lastName, emp.email, emp.phoneNumber,emp.countryCode,
            designation.designation, practice.practiceArea, edu.education, user.organization,
            emp.specialization, emp.careerHighlights, emp.certifications, emp.career_start_date,c.ClientName
            from employees as emp
            inner join designations as designation
            on emp.FKDesignationId = designation.Id
            inner join practiceareas as practice
            on emp.FKPracticeAreaId = practice.Id
            inner join educations as edu
            on emp.FKHighestEducationId = edu.Id
            inner join users as user
            on emp.Id = user.FKEmpId
            inner Join employee_client as ec
            on ec.FKEmpId=emp.Id
            inner join clients as c
            on c.Id=ec.FKClientId
            order by emp.firstName
            
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

async function GetEmployeeById(id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `
            select * from employees
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

async function InsertEmployeeDetails(firstname, lastname, email, phoneNumber, countryCode, designationId,
    practiceAreaId, educationId, specialization, certifications, careerHighlights, careerStartDate) {

    let certification = certifications === "" || certifications === null ? "Not Updated" : certifications
    let careerHighlight = careerHighlights === "" || careerHighlights === null ? "Not Updated" : careerHighlights

    try {

        let response = await new Promise((Success, Rejected) => {
            const sqlQuery = `insert into 
            employees(firstName,lastName,
                email, phoneNumber,countryCode,
                FKDesignationId,
                FKPracticeAreaId,FKHighestEducationId,specialization,
                certifications,careerHighlights, career_start_date) 
                values('${firstname}','${lastname}','${email}', ${Number.parseInt(phoneNumber)},'${countryCode}',
                ${designationId},${practiceAreaId},
                ${educationId},'${specialization}',
                '${certification}','${careerHighlight}', '${careerStartDate}')`

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

async function UpdateEmployeeDetails(Id, firstName, lastName, email, phoneNumber,
    designationId, practiceAreaId, educationId, specialization, certifications, careerHighlights, careerStartDate) {

    let certification = certifications === "" || certifications === null ? "Not Updated" : certifications
    let careerHighlight = careerHighlights === "" || careerHighlights === null ? "Not Updated" : careerHighlights


    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery =
                `
                update employees
                set firstName = '${firstName}', lastName = '${lastName}', email = '${email}', 
                phoneNumber = ${Number.parseInt(phoneNumber)}, FKDesignationId = ${Number.parseInt(designationId)},
                FKPracticeAreaId = ${Number.parseInt(practiceAreaId)}, FKHighestEducationId = ${educationId},
                specialization = '${specialization}', certifications = '${certification}', careerHighlights = '${careerHighlight}',
                career_start_date = '${careerStartDate}'
                where Id = ${Number.parseInt(Id)}
            
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

async function DeleteEmployeeById(id) {

    try {

        let response = await new Promise((Success, Rejected) => {

            const sqlQuery = `delete from employees where Id = ${Number.parseInt(id)}`

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
    GetEmployees,
    GetEmployeeById,
    InsertEmployeeDetails,
    UpdateEmployeeDetails,
    DeleteEmployeeById
}