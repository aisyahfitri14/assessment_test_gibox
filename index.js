express = require('express')
mysql = require('mysql')
url = require('url')
app = express()
koneksidb = require("./db")

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

// Function get all data
app.get('/karyawan', function (req, res) {
    sql = "SELECT * FROM karyawan"; // query to get all data

    //checking the query to db
    koneksidb.query(sql, function (err, result) {
      if (err) {
        res.json({message: "Connection TimeOut" }) //if the connection get wrong or query is false
        return res.status(500)
      }else{
        res.json({result}) // show the result 
      }
    })
})

// Function get data by no
app.get('/karyawan/:id', function (req, res) {
    getId = req.params.id // get id from url
    sql = "SELECT * FROM karyawan WHERE no=" + getId // query to get data by no

    koneksidb.query(sql, function (err, result) {
      if (err) {
        res.json({message: "Connection TimeOut" })
        return res.status(500)
      }else{
        res.json({result})
      }
    })
})

app.listen(8090) // Application port