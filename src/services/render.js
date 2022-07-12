const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/sessions
  axios
    .get("http://localhost:3000/sessions")
    .then(function (response) {
      res.render("sessions", { sessions: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_sessions = (req, res) => {
  res.render("add_sessions");
};

exports.update_session = (req, res) => {
  axios
    .get("http://localhost:3000/api/sessions", { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render("update_session", { session: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
