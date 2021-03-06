const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");
const sessions = require("../data/sessions.json");

const adminRouter = express.Router();

adminRouter.route("/").get((req, res) => {
  const url = "mongodb://localhost:27017";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);

      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
  })();
});

module.exports = adminRouter;
