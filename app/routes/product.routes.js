const { authJwt } = require("../middleware")

module.exports = app => {
    const products = require("../controllers/product.controller");

    let router = require("express").Router();

    //create new Product
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], products.create);

    //retrieve all products
    router.get("/", products.findAll);

    //retrieve a single product by id
    router.get("/:id", products.findOne);

    //update a product with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], products.update);

    //delete product by id
    router.delete("/:id",[authJwt.verifyToken, authJwt.isAdmin], products.delete);

    //delete all products
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], products.deleteAll);

    app.use("/api/test/products", router);

}

// async function getProduct (req,res,next){
//     let product
//     try {
//         product = await Product.findById(req.params.id)
//         if(!product) {
//             return res.status(404).json({ message: "Cannot find specified product."})
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message})
//     }
//     res.product = product
//     next()
// }