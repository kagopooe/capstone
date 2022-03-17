const res = require("express/lib/response");
const db = require("../models") 
const Product = db.product

// create and save a new product 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    //create product
    const product = new Product({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        img: req.body.img,
        price: req.body.price
    });

    //save a product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

// retrieve all products from the database
exports.findAll = (req,res) => {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i"}} : {};

    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving products."
            });
        })
};

//find a single product by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "No Product matching id " + id });
            else res.send(data)
            })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Product with id " + id})
        });
};

// update an product by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    };

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe the tutorial was not found!`
                });
            }else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating product with id = " + id
            });
        });
};

//Delete a product with the specified id in request
exports.delete = (req,res) => {
    const id = req.params.id;
    
    Product.findByIdAndRemove(id, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete product with id=${id}. Maybe the Product was not found!`
                });
            }else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id = " + id
            });
        });
};

//Delete all Products from db
exports.deleteAll = (req,res) => {
    Product.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({ 
                message: err.message || "Some error occurred while removing all products"
            });
        });
};


