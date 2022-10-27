var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "toko"
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});


module.exports = db;