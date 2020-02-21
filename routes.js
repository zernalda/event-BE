module.exports = function(app) {
    const todo = require('./controller');
    // const validate = require('./validation');
    //const jwt = require('jsonwebtoken');
    function verifyToken(req, res, next) {
        console.log("masuk"+ req);
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
          // Split at the space
          const bearer = bearerHeader.split(' ');
          // Get token from array
          const bearerToken = bearer[1];
          // Set the token
          req.token = bearerToken;
          // Next middleware
          next();
        } else {
          // Forbidden
          res.sendStatus(403);
        }
      
      }

    app.route('/')
        .get(todo.index);

    app.route('/getToken')
        .post(todo.getToken);

    app.route('/login')
        .post(verifyToken, todo.login);

    app.route('/user')
        .get(todo.getUser);
    
    app.route('/gcpDomains')
        .post(todo.gcpDomains);

    app.route('/domains')
        .get(todo.domains);

    app.route('/domains')
        .post(todo.createDomains);

    app.route('/domains')
        .delete(todo.deleteDomain);

    app.route('/customers')
        .get(todo.customers);

    app.route('/customer')
        .get(todo.customerId);

    app.route('/customers')
        .post(todo.createCustomers);

    app.route('/customer')
        .delete(todo.deleteCustomer);
};