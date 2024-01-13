var mysql = require('mysql')
var pool = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'2003',
    database:'minor-project',
    port:'3306',
    multipleStatements:true,
})
module.exports=pool