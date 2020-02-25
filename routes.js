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

    app.route('/createevent')
        .post(todo.createEvent);

    // app.route('/customer')
    //     .delete(todo.deleteCustomer);
};