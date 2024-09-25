const express = require('express')
const router = express.Router();
const orderControl = require('../controllers/orderControl')

//my cart
router.post("/mycart",orderControl.CreatemyCart);

//update quantity in home
router.post("/updateQuantityinhome",orderControl.UpdateQuantityCartInHome);

//display the cart
router.post("/displaycart",orderControl.DisplayCart);

//View Product Form Cart
router.post("/viewproductformcart",orderControl.ViewProductFormCart);

//display the cart Out Of Stock
router.post("/displaycartOutofStock",orderControl.DisplayCartOutofStock);

//update quantity
router.post("/updateQuantity",orderControl.UpdateQuantityCart);

//Delete the cart
router.post("/deletecart",orderControl.DeleteCart);

//add address
// router.post("/address",orderControl.AddAddress);

//My Order
router.post("/myorder",orderControl.MyOrder);

//Clear Cart
router.post("/clearcart",orderControl.ClearCart);

//Delete All Cart Product
router.post("/deleteallcartproduct",orderControl.DeleteAllCartProduct);

//display the myOrders
router.post("/displaymyorders",orderControl.DisplayMyOrders);

//display the myOrders in Dashboard
router.post("/displaymyordersdashboard",orderControl.DisplayMyOrdersDashboard);

//display the address
// router.get("/displayaddress/:id",orderControl.DisplayAddress);

//update status
router.post("/updatestatus",orderControl.Updatestatus);

//update status when Delete Account
router.post("/updatestatusdeleteaccount",orderControl.UpdatestatusDeleteAccount);

//update Stock cart
router.post("/updatestock",orderControl.UpdateCartstock);

//update Cart Product
router.post("/updatecartproduct",orderControl.UpdateCartProduct);

//update Stock cart when delete account
router.post("/updatestockdeleteaccount",orderControl.UpdateCartstockDeleteAccount);

module.exports = router;