const express = require("express");
const { createProduct, getAllProducts, deleteProduct, updateProduct, getUserProducts } = require("../controllers/productController");
const { userAuthenticate, authorizeUser } = require("../middlewares/auth");
const router = express.Router();
console.log("PRODUCT ROUTES LOADED");

router.route("/create").post(userAuthenticate, authorizeUser(["admin", "seller"]), createProduct);

// function sampleRouterMiddleware(req,res,next){
//     console.log("sampleRouterMiddleware------------>");
//     next()

// }

router.route("/all").get(getAllProducts);
router.route("/my-products").get(userAuthenticate,authorizeUser(["admin", "seller"]), getUserProducts);
router.route("/:id").delete(userAuthenticate, authorizeUser(["admin", "seller"]), deleteProduct).put(userAuthenticate, authorizeUser(["admin", "seller"]),updateProduct);
module.exports = router;    