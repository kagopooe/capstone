const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            min: 5,
            max: 300
        },
        category: {
            type: String,
            required: true,
            min: 3,
            max:30
        },
        description: {
            type: String,
            required: true,
            min: 3,
            max:200
        },
        img: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 5
        },
        date: { 
            type: Date,
            default: Date.now
        },

    })
);

module.exports = Product;