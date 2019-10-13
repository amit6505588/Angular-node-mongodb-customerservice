const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const State = require('./../models/state');
var router = express.Router();

exports.getStates = function(req, res) {
  console.log('*** StatesRepository.getStates');
  State.find({}, {}, (err, states) => {
    if (err) {
      console.log(`*** StatesRepository.getStates err: ${err}`);
      res.send(err);
    }
    res.send(states);
  });
};

// get a state
exports.getState = function(req, res) {
  console.log('*** StatesRepository.getState');
  let id = req.params.id;
  console.log(id);
  State.find({ id: id }, {}, (err, state) => {
    if (err) {
      console.log(`*** StatesRepository.getState err: ${err}`);
      res.send(err);
    }
    res.send(state);
  });
};


exports.setState = function(req, res) {
  let stateObj = {
    id: req.body.id,
    abbreviation: req.body.abbreviation,
    name: req.body.name
  };

  var state = new State(stateObj);
  state.save((err, stateObj) => {
    if (err) {
      console.log(`*** StateRepository insertCustomer error: ${err}`);
      res.send('error');
    }

    res.send(stateObj);
  });

  // var states = [
  //   { "name": "Alabama", "abbreviation": "AL" },
  //   { "name": "Montana", "abbreviation": "MT" },
  //   { "name": "Alaska", "abbreviation": "AK" },
  //   { "name": "Nebraska", "abbreviation": "NE" },
  //   { "name": "Arizona", "abbreviation": "AZ" },
  //   { "name": "Nevada", "abbreviation": "NV" },
  //   { "name": "Arkansas", "abbreviation": "AR" },
  //   { "name": "New Hampshire", "abbreviation": "NH" },
  //   { "name": "California", "abbreviation": "CA" },
  //   { "name": "New Jersey", "abbreviation": "NJ" },
  //   { "name": "Colorado", "abbreviation": "CO" },
  //   { "name": "New Mexico", "abbreviation": "NM" },
  //   { "name": "Connecticut", "abbreviation": "CT" },
  //   { "name": "New York", "abbreviation": "NY" },
  //   { "name": "Delaware", "abbreviation": "DE" },
  //   { "name": "North Carolina", "abbreviation": "NC" },
  //   { "name": "Florida", "abbreviation": "FL" },
  //   { "name": "North Dakota", "abbreviation": "ND" },
  //   { "name": "Georgia", "abbreviation": "GA" },
  //   { "name": "Ohio", "abbreviation": "OH" },
  //   { "name": "Hawaii", "abbreviation": "HI" },
  //   { "name": "Oklahoma", "abbreviation": "OK" },
  //   { "name": "Idaho", "abbreviation": "ID" },
  //   { "name": "Oregon", "abbreviation": "OR" },
  //   { "name": "Illinois", "abbreviation": "IL" },
  //   { "name": "Pennsylvania", "abbreviation": "PA" },
  //   { "name": "Indiana", "abbreviation": "IN" },
  //   { "name": "Rhode Island", "abbreviation": "RI" },
  //   { "name": "Iowa", "abbreviation": "IA" },
  //   { "name": "South Carolina", "abbreviation": "SC" },
  //   { "name": "Kansas", "abbreviation": "KS" },
  //   { "name": "South Dakota", "abbreviation": "SD" },
  //   { "name": "Kentucky", "abbreviation": "KY" },
  //   { "name": "Tennessee", "abbreviation": "TN" },
  //   { "name": "Louisiana", "abbreviation": "LA" },
  //   { "name": "Texas", "abbreviation": "TX" },
  //   { "name": "Maine", "abbreviation": "ME" },
  //   { "name": "Utah", "abbreviation": "UT" },
  //   { "name": "Maryland", "abbreviation": "MD" },
  //   { "name": "Vermont", "abbreviation": "VT" },
  //   { "name": "Massachusetts", "abbreviation": "MA" },
  //   { "name": "Virginia", "abbreviation": "VA" },
  //   { "name": "Michigan", "abbreviation": "MI" },
  //   { "name": "Washington", "abbreviation": "WA" },
  //   { "name": "Minnesota", "abbreviation": "MN" },
  //   { "name": "West Virginia", "abbreviation": "WV" },
  //   { "name": "Mississippi", "abbreviation": "MS" },
  //   { "name": "Wisconsin", "abbreviation": "WI" },
  //   { "name": "Missouri", "abbreviation": "MO" },
  //   { "name": "Wyoming", "abbreviation": "WY" }
  //   ];

  //   var l = states.length,
  //       i;

  //   State.remove({});

  //   for (i = 0; i < l; i++) {
  //       var state = new State ({ 'id': i + 1, 'name': states[i].name, 'abbreviation': states[i].abbreviation });
  //       state.save();
  //   }
  //   res.send("success")
};
