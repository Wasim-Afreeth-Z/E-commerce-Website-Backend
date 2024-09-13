const express = require('express')
const router = express.Router();
const multer = require('multer') // file upload use this package (npm install multer)  
const ProductsControl = require('../controllers/ProductsControl')
const path = require('path')
const { TokenCheck } = require('../Middlewares/auth')
const image = require('../images')

// !upload path for Product Image
const productstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/product-images')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
    }
})
const ProductUpload = multer({ storage: productstorage })

//product image
router.post("/upload-image",ProductUpload.single('product-image'),image.ProductImage);

//product multiple image
router.post("/upload-multiple-image",ProductUpload.array('product-images'),image.ProductMultipleImage);

//Create product
router.post("/create", ProductsControl.CreateProduct);

//Display the product
router.get("/display/:id", ProductsControl.GetProducts);

//Display the product by UserID
router.get("/displaybyid/:id",TokenCheck, ProductsControl.GetProductsByID);

//category List
router.get("/categorylist", ProductsControl.categoryList);

//category filter
router.get("/category/:id", ProductsControl.categoryFilter);

//category filter Admin
router.post("/categorydashboard", ProductsControl.categoryFilterForAdmin);

//Search filter
router.get("/search/:id", ProductsControl.SearchFilter);

//Search filter Admin
router.post("/searchdashboard", ProductsControl.SearchFilterForAdmin);

//Update the Product
router.put("/update/:id", ProductsControl.UpdateProduct);

//update quantity product
router.put("/updateQuantity/:id", ProductsControl.UpdateQuantityProduct);

//Delete the Product
router.delete("/delete/:id", ProductsControl.DeleteProduct);

//Delete All the Product
router.delete("/deleteallproduct/:id", ProductsControl.DeleteAllProduct);

//view product
router.post("/viewproduct", ProductsControl.ViewProduct);

module.exports = router;