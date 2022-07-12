const express = require("express");
const debug = require("debug")("app:authRouter");
const { MongoClient, ObjectID } = require("mongodb");
const passport = require("passport");
const notifier = require("node-notifier");

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  const url = "mongodb://localhost:27017";
  const dbName = "globomantics";

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);
      req.login(results.ops[0], () => {
        res.redirect("/auth/signIn");
        notifier.notify({
          title: "User registered succesfully!",
          message: "Please Login to proceed.",
          icon: "../public/images/G.png",
          wait: false,
          time: 1000,
        });
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/signedIndex",
      failureRedirect: "/signIn",
    })
  );

// authRouter.route("/profile").get((req, res) => {
//   res.json(req.user);
// });

module.exports = authRouter;
