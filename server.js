const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");
const Role = db.role;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to db");
    initial()
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Pizza Planet application.",
            routes: {
              
              auth: {
                login: "POST api/auth/signin",
                register: "POST api/auth/signup",
                    },
              users: {
                getAll: "GET api/test/users",
                getByID: "GET api/test/users/:id",
                delete1: "DELETE api/test/users/:id",
                edit: "PUT api/test/users/:id",
                contactForm: "POST api/test/users"
              },
              products: {
                getAll: "GET api/test/products",
                create: "POST api/test/products",
                get1: "GET api/test/products/:id",
                delete: "DELETE api/products/:id",
                edit1: "PUT api/test/products/:id"
              }
            }
  });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
