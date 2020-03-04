module.exports = function(app) {
    const todo = require('./controller');

    app.route('/')
        .get(todo.index);

        // AGMS ROUTES // AGMS ROUTES // AGMS ROUTES // AGMS ROUTES // AGMS ROUTES// AGMS ROUTES// AGMS ROUTES

    app.route('/createevent')
        .post(todo.createEvent);

    app.route('/listevents')
        .get(todo.listEvent);

    // app.route('/customer')
    //     .delete(todo.deleteCustomer);
};