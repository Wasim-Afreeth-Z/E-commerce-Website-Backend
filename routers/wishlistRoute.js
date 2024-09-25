const express = require('express')
const router = express.Router();
const wishlistControl = require('../controllers/wishlistControl')

//my wishlist create
router.post("/create",wishlistControl.CreateMyWishlist);

//display the wishlist
router.post("/displaywishlist",wishlistControl.DisplayWishlist);

//Delete the wishlist product
router.post("/deletewishlist",wishlistControl.DeleteWishlist);

//update Stock Wishlist
router.post("/updatestock",wishlistControl.UpdateWishlistStock);

//update Wishlist product
router.post("/updatewishlistproduct",wishlistControl.UpdateWishlistProduct);

//update quantity wish list
router.post("/updateQuantity",wishlistControl.UpdateQuantityWishlist);

//update Stock Wishlist when delete account
router.post("/updatestockdeleteaccount",wishlistControl.UpdateWishlistStockDeleteAccount);

//Delete All Wishlist Product
router.post("/deleteallwishlistproduct", wishlistControl.DeleteAllWishlistProduct);

//View Product Form Wishlist
router.post("/viewproductformwishlist",wishlistControl.ViewProductFormWishlist);

module.exports = router;