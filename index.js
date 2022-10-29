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

// Function insert data
app.post('/karyawan', function (req, res) {
  // get response
  response = req.body

  // split string tglLahir 
  tglLahir = JSON.stringify(response.tglLahir) // get the value of tglLahir from response
  hari = tglLahir.substring(1, 3)
  bulan = tglLahir.substring(4, 6)
  tahun = tglLahir.substring(7, 11)
  
  nama = response.nama // get the value of nama from response
  
  resultZodiak = zodiak(hari, bulan) // get the value of zodiak from function zodiak()
  
  // get the value of usia with calculate the year
  year = new Date()
  yearNow = year.getFullYear()
  usia = yearNow - tahun
  
  // sql insert data
  sql = `INSERT INTO karyawan (nama, hari, bulan, tahun, zodiak, usia) VALUES ('${nama}', '${hari}', '${bulan}', '${tahun}', '${resultZodiak}','${usia}')`;
  
  koneksidb.query(sql, function (err, result) {
    if(err) {
      res.json({message: "Connection TimeOut" })
      return res.status(500)
    }else{
      res.json({ tanggal: hari, bulan: bulan, tahun: tahun, nama: nama, usia: usia, zodiak: resultZodiak, responseCode: res.statusCode, message: "Successfull Approval" })
    }   
  })
})

// function to get your zodiak
function zodiak(hari, bulan, zod) {
  if ((hari >= 21 && bulan == 3) || (hari <= 19 && bulan == 4)) {
    zod = "Aries"
    return zod
  } else if (hari >= 20 && bulan == 4 || hari <= 20 && bulan == 5) {
    zod = "Taurus"
    return zod
  } else if (hari >= 21 && bulan == 5 || hari <= 21 && bulan == 6) {
    zod = "Gemini"
    return zod
  } else if (hari >= 22 && bulan == 6 || hari <= 22 && bulan == 7) {
    zod = "Cancer"
    return zod
  } else if (hari >= 23 && bulan == 7 || hari <= 22 && bulan == 8) {
    zod = "Leo"
    return zod
  } else if (hari >= 23 && bulan == 8 || hari <= 22 && bulan == 9) {
    zod = "Virgo"
    return zod
  } else if (hari >= 23 && bulan == 9 || hari <= 22 && bulan == 10) {
    zod = "Libra"
    return zod
  } else if (hari >= 23 && bulan == 10 || hari <= 21 && bulan == 11) {
    zod = "Scorpio"
    return zod
  } else if (hari >= 22 && bulan == 11 || hari <= 21 && bulan == 12) {
    zod = "Sagitarius"
    return zod
  } else if (hari >= 22 && bulan == 12 || hari <= 19 && bulan == 1) {
    zod = "Capricorn"
    return zod
  } else if (hari >= 20 && bulan == 1 || hari <= 18 && bulan == 2) {
    zod = "Aquarius"
    return zod
  } else if (hari >= 19 && bulan == 2 || hari <= 20 && bulan == 3) {
    zod = "Pisces"
    return zod
  }
}



app.listen(8090) // Application port