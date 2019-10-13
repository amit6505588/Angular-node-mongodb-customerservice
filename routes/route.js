var express = require('express');
var router = express.Router();

var stateController = require('../controllers/state.controllers');
var customerController = require('../controllers/customer.controllers');

//state controller
router.get('/api/states', stateController.getStates);
router.get('/api/states/:id', stateController.getState);
router.post('/api/states', stateController.setState);


//customer controller
router.get('/api/customers', customerController.getCustomers);
router.get('/api/customers/page/:skip/:top', customerController.getCustomersPage);
router.get('/api/customers/:id', customerController.getCustomer);
router.post('/api/customers', customerController.insertCustomer);
router.put('/api/customers/:id', customerController.updateCustomer);
router.delete('/api/customers/:id', customerController.deleteCustomer);

module.exports = router;
