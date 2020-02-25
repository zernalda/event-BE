'use strict';

const response = require('./res');
const connection = require('./conn');   
const cors = require('cors');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
// let unirest = require('unirest');
app.use(cors());


app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "'http://localhost:3000"); // update to match the domain you will make the request from
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// res.header("Access-Control-Allow-Origin", "https://jsonwhois.com/api/v1/whois");
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Host, Authorization');
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Host, Authorization");
 // update to match the domain you will make the request from
 // 
  next();
});


// login
exports.getToken = function (req, res) {
    const user = {
        id: 1, 
        username: 'zernalda@point-star.com',
        pass: 'developer'
      }
    
      jwt.sign({user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
        res.json({
          token
        });
      });
    };

exports.login = function (req, res) {  
        // verifyToken,
        jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.json({
                message: 'error'+ err,
                authData
                });
            // res.sendStatus(403);
        } else {
            res.json({
            message: 'Post created...',
            authData
            });
        }
        });
    };

exports.getUser = function(req, res) {
    connection.query('SELECT * FROM user_login', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
            console.log("success get usersssss");
      }
    });
};

// GET domain
exports.domains = function(req, res) {
    connection.query('SELECT * FROM partner_reseller', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

// GET SPF // Check GCPDomain
exports.gcpDomains = function(req, res) {
    
    let domain_name = req.body.domain;
    console.log(domain_name);

    response.ok(domain_name, res)

    //exports.createDomains = function(req, res) {
    
    //}   
    /*    
    let urlMx = `https://mxtoolbox.com/api/v1/lookup/mx/`+domain_name;
    let urlSpf = `https://mxtoolbox.com/api/v1/lookup/spf/`+domain_name;

    axios.all([urlMx, urlSpf])
    .then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        // use/access the results 
        // console.log("mx: " + responseOne + ", response : " +responses.data.Information);
        // console.log("spf: " + responseTwo);
        })).catch(errors => {
        // react on errors.
        });

    // return true or false
    axios.get(urlMx)
    .then(response => {
        const element = [];

        // console.log("test value: "+response.data.Information);
        console.log("jumlah response: " + response.data.Information.length);
        console.log("ini hasil URL MX: "+urlMx+ " ,domain :"+this.state.newDomain.domain);
        if ( response.data.Information.length > 0) {
            // for(let in=0; in<response.data.Information.length; in++) {

            // }
            
            for (let index = 0; index < response.data.Information.length; index++) {
                console.log(response.data.Information[index].Hostname);
                // element.push("Hostname");
                const Hostname = response.data.Information[index].Hostname;
                const id=index;
                const findHost = Hostname.indexOf('google.com');

                // validation


                element.push({id,Hostname, findHost});
                //if(element !== '') { element = element + ','; }
                //element += '{hostname:'+response.data.Information[index].Hostname+'}';

                
            }
            //{"hostname":"alt1@globalAgent.com"},{"hostname":"alt2@globalAgent.com"}
            console.log("masuk sini");
            console.log(element);
        } else {
            console.log("masuk sono");
        }
        this.setState({
            //outputLists: response.data.Information,
            outputLists: element,
            outputListsLength: response.data.Information.length,
            outputListsString: JSON.stringify(response.data.Information)
        });
    });
    */

    /*
    axios.get(cors(),'https://mxtoolbox.com/api/v1/lookup/spf/point-star.com')
    .end( function (error,res){
        if(error){
            console.log("masuk sini: " +error)
        } else{
            response.ok(res)
        }
    });
    */
}

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

// POST CUSTOMER
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