var Sessionsdb = require("../model/model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  const session = new Sessionsdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  session
    .save(session)
    .then((data) => {
      res.redirect("/add-sessions");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Sessionsdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found session with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Erro retrieving session with id " + id });
      });
  } else {
    Sessionsdb.find()
      .then((session) => {
        res.send(session);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving session information",
        });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Sessionsdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe session not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update session information" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sessionsdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Session was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Session with id=" + id,
      });
    });
};
