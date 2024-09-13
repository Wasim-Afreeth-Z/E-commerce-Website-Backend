const express = require('express')
const router = express.Router();
const wishlistControl = require('../controllers/wishlistControl')

//my wishlist create
router.post("/create",wishlistControl.CreateMyWishlist);

//display the wishlist
router.get("/displaywishlist/:id",wishlistControl.DisplayWishlist);

//Delete the wishlist product
router.delete("/deletewishlist/:id",wishlistControl.DeleteWishlist);

//update Stock Wishlist
router.put("/updatestock/:id",wishlistControl.UpdateWishlistStock);

//update Wishlist product
router.put("/updatewishlistproduct/:id",wishlistControl.UpdateWishlistProduct);

//update quantity wish list
router.put("/updateQuantity/:id",wishlistControl.UpdateQuantityWishlist);

//update Stock Wishlist when delete account
router.put("/updatestockdeleteaccount/:id",wishlistControl.UpdateWishlistStockDeleteAccount);

//Delete All Wishlist Product
router.delete("/deleteallwishlistproduct/:id", wishlistControl.DeleteAllWishlistProduct);

//View Product Form Wishlist
router.post("/viewproductformwishlist",wishlistControl.ViewProductFormWishlist);

module.exports = router;