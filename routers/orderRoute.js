const express = require('express')
const router = express.Router();
const orderControl = require('../controllers/orderControl')

//my cart
router.post("/mycart",orderControl.CreatemyCart);

//update quantity in home
router.post("/updateQuantityinhome",orderControl.UpdateQuantityCartInHome);

//display the cart
router.get("/displaycart/:id",orderControl.DisplayCart);

//View Product Form Cart
router.post("/viewproductformcart",orderControl.ViewProductFormCart);

//display the cart Out Of Stock
router.get("/displaycartOutofStock/:id",orderControl.DisplayCartOutofStock);

//update quantity
router.put("/updateQuantity/:id",orderControl.UpdateQuantityCart);

//Delete the cart
router.delete("/deletecart/:id",orderControl.DeleteCart);

//add address
// router.post("/address",orderControl.AddAddress);

//My Order
router.post("/myorder",orderControl.MyOrder);

//Clear Cart
router.delete("/clearcart/:id",orderControl.ClearCart);

//Delete All Cart Product
router.delete("/deleteallcartproduct/:id",orderControl.DeleteAllCartProduct);

//display the myOrders
router.get("/displaymyorders/:id",orderControl.DisplayMyOrders);

//display the myOrders in Dashboard
router.get("/displaymyordersdashboard/:id",orderControl.DisplayMyOrdersDashboard);

//display the address
// router.get("/displayaddress/:id",orderControl.DisplayAddress);

//update status
router.put("/updatestatus/:id",orderControl.Updatestatus);

//update status when Delete Account
router.put("/updatestatusdeleteaccount/:id",orderControl.UpdatestatusDeleteAccount);

//update Stock cart
router.put("/updatestock/:id",orderControl.UpdateCartstock);

//update Cart Product
router.put("/updatecartproduct/:id",orderControl.UpdateCartProduct);

//update Stock cart when delete account
router.put("/updatestockdeleteaccount/:id",orderControl.UpdateCartstockDeleteAccount);

module.exports = router;