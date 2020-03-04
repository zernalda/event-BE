'use strict';

const response = require('./res');
const connection = require('./conn');   
const cors = require('cors');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(cors());


app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "'http://localhost:3000"); // update to match the domain you will make the request from
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// // login
// exports.getToken = function (req, res) {
//     const user = {
//         id: 1, 
//         username: 'zernalda@point-star.com',
//         pass: 'developer'
//       }
    
//       jwt.sign({user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
//         res.json({
//           token
//         });
//       });
//     };

// POST Domain
exports.createDomains = function(req, res) {
    
    let partner_name = req.body.partner_name;
    let partner_domain_name = req.body.partner_domain_name;

    connection.query('INSERT INTO partner_reseller (partner_name, partner_domain_name) values (?,?)',
    [ partner_name, partner_domain_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan domain!", res)
        }
    });
};

// DELETE DOMAIN
exports.deleteDomain = function(req, res) {
    console.log(req.body.id);
    let id = req.body.id;

    console.log("parameter: " +id )
    connection.query('DELETE FROM partner_reseller WHERE id = ?',
    [ id ],
    
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus domain!", res)
        }
    });
};

// GET customers
exports.customers = function(req, res) {
    connection.query('SELECT * FROM customer', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

// GET customer /id
exports.customerId = function(req, res) {
    console.log(req.body.id);
    let id = req.body.id;

    // console.log("parameter: " +id )
    connection.query('SELECT * FROM customer WHERE id = ?',
    [ id ],
    
    function (error, rows, fields){
        if(error){
            console.log(error);
        } else{
            response.ok(rows, res)
        }
    });
};

// DELETE Customer
exports.deleteCustomer = function(req, res) {
    console.log(req.body.id);
    let id = req.body.id;

    // console.log("parameter: " +id )
    connection.query('DELETE FROM customer WHERE id = ?',
    [ id ],
    
    function (error, rows, fields){
        if(error){
            console.log(error);
            console.log("error nihh");
        } else{
            response.ok("Berhasil menghapus customer!", res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

// XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS // XL-AGMS

// POST EVENT
exports.createEvent = function(req, res) {
    console.log(req.body);
    let name = req.body.name;
    let description = req.body.description;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    connection.query('INSERT INTO event (name, description, location, startdate, enddate) values (?, ?, ?, ?, ?)',
    [ 
        name, 
        description, 
        location,
        startdate,
        enddate
    ], 
    function (error, rows, fields){
        if(error){
            console.log("INI ERROR NYA" + error)
        } else{
            response.ok("Berhasil menambahkan event!", res)
        }
    });
};

// GET EVENT LIST
exports.listEvent = function(req, res) {
    connection.query('SELECT * FROM event', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};