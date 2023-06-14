const { createConnection } = require('mysql')


const db = createConnection({
    host: "iemployee.mysql.database.azure.com",
    user: "iEmployeeGZ_adm",
    password: "Mysql_Pass#1",
    database: "iemployee",
    port: 3306
})

if (db.connect) {
    console.log("Database is connected")
}
else {
    console.log("Database is NOT Running")
}

module.exports = db;