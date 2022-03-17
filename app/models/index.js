const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const database = {};

database.mongoose = mongoose;

database.user = require("./user.model");
database.role = require("./role.model");
database.product = require("./product.model")

database.ROLES = ["user", "admin", "moderator"];

module.exports = database;