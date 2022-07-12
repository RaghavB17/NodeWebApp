const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  Speaker: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

const Sessionsdb = mongoose.model("sessionsdb", schema);

module.exports = Sessionsdb;
