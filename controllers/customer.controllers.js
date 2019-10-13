const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const Customer = require('../models/customer');
var router = express.Router();

exports.getCustomers = function(req, res) {
  console.log('*** CustomersRepository.getCustomers');
  Customer.count((err, custsCount) => {
    let count = custsCount;
    console.log(`Customers count: ${count}`);

    Customer.find({}, (err, customers) => {
      if (err) {
        console.log(`*** CustomersRepository.getCustomers error: ${err}`);
        res.send(err);
      }
      res.send({
        count: count,
        customers: customers
      });
    });
  });
};

exports.getCustomersPage = function(req, res) {
  console.log('*** getCustomersPage');
  const topVal = req.params.top,
    skipVal = req.params.skip,
    top = isNaN(topVal) ? 10 : +topVal,
    skip = isNaN(skipVal) ? 0 : +skipVal;
  Customer.count((err, custsCount) => {
    let count = custsCount;
    console.log(`Skip: ${skip} Top: ${top}`);
    console.log(`Customers count: ${count}`);

    Customer.find({})
      .sort({ lastName: 1 })
      .skip(skip)
      .limit(top)
      .exec((err, customers) => {
        if (err) {
          console.log(
            `*** CustomersRepository.getPagedCustomers error: ${err}`
          );
          res.send(err);
        }
        res.send({
          count: count,
          customers: customers
        });
      });
  });
};

// get a state
exports.getCustomer = function(req, res) {
  console.log('*** CustomerRepository.getState');
  let id = req.params.id;
  console.log(id);
  Customer.findById(id, (err, customer) => {
    if (err) {
      console.log(`*** CustomerRepository.getcustomer err: ${err}`);
      res.send(err);
    }
    res.send(customer);
  });
};


exports.insertCustomer = function(req, res) {
  let customerObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    stateId: req.body.stateId,
    state: req.body.state,
    zip: req.body.zip,
    gender: req.body.gender
    //orderCount: req.body.orderCount
  };

  var customer = new Customer(customerObj);
  customer.save((err, customerObj) => {
    if (err) {
      console.log(`*** customerRepository insertCustomer error: ${err}`);
      res.send('error');
    }

    res.send(customerObj);
  });
};

exports.updateCustomer = function(req, res) {
  let id = req.params.id;

  Customer.findById(id, (err, customer) => {
    if (err) {
      console.log(`*** CustomersRepository.editCustomer error: ${err}`);
      res.send(err);
    }

    customer.firstName = req.body.firstName || customer.firstName;
    customer.lastName = req.body.lastName || customer.lastName;
    customer.email = req.body.email || customer.email;
    customer.address = req.body.address || customer.address;
    customer.city = req.body.city || customer.city;
    customer.state = req.body.state || customer.state;
    customer.stateId = req.body.stateId || customer.stateId;
    customer.zip = req.body.zip || customer.zip;
    customer.gender = req.body.gender || customer.gender;

    customer.save((err, customer) => {
      if (err) {
        console.log(`*** CustomersRepository.updateCustomer error: ${err}`);
        res.send(err);
      }

      res.send(customer);
    });
  });
};

exports.deleteCustomer = function(req, res) {
  let id = req.params.id;
  Customer.remove({ _id: id }, (err, customer) => {
    if (err) {
      console.log('*** deleteCustomer error: ' + util.inspect(err));
      res.json({ status: false });
    } else {
      console.log('*** deleteCustomer ok');
      res.json({ status: true });
    }
  });
};
