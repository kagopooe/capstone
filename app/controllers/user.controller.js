const db = require("../models")
const User = db.user

//retrieve all users from db
exports.findAll = (req, res) => {
  const fullname = req.query.fullname;
  let condition = fullname ? { fullname: { $regex: new RegExp(fullname), $options: "i" }} : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => { 
      res.status(500).send({
        message: 
        err.message || "Some error while retrieving tutorials" //start here
      })
    })
}











exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
