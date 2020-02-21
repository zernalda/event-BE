var mysql = require('mysql');

// xl-pointstar DB
// var con = mysql.createConnection({
//   host: "35.185.159.252",
//   user: "nalda",
//   password: "rootroot",
//   database: "ps_partner_management"
// });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;