const express = require("express");
const debug = require("debug")("app:sessionsRouter");
const { MongoClient, ObjectID } = require("mongodb");
const notifier = require("node-notifier");
const speakerService = require("../services/speakerService");

const sessions = require("../data/sessions.json");

const sessionsRouter = express.Router();
sessionsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
    notifier.notify({
      title: "Sessions restricted!",
      message: "Please Login to view sessions.",
      icon: "../public/images/G.png",
      wait: false,
      time: 1000,
    });
  }
});

sessionsRouter.route("/").get((req, res) => {
  const url = "mongodb://localhost:27017";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", { sessions });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const url = "mongodb://localhost:27017";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);

      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectID(id) });

      const speaker = await speakerService.getSpeakerById(
        session.speakers[0].id
      );

      session.speaker = speaker.data;
      res.render("session", { session });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionsRouter;
