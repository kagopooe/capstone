const db = require("../models");
const User = db.user;
const nodemailer = require("../config/email.config");

//retrieve all users from db
exports.findAll = (req, res) => {
  const fullname = req.query.fullname;
  let condition = fullname
    ? { fullname: { $regex: new RegExp(fullname), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving users", //start here
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id).then((data) => {
    if (!data)
      res.status(404).send({ message: "Not found a User with id " + id });
    else res.send(data);
  });
};

//update a User by id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id = ${id}. Maybe User was not found`,
        });
      } else res.send({ message: "User was updated successfully." });
        // console.log(data);
        nodemailer.sendUpdateEmail(data.fullname, data.email);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id = " + id,
      });
    });
};

// Delete a User by id
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
        // console.log(data);
        nodemailer.sendDeletionEmail(data.fullname, data.email)
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id = " + id,
      });
    });
};

//delete all users
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users",
      });
    });
};

exports.allAccess = (req, res) => {
  res.status(200).send("");
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
