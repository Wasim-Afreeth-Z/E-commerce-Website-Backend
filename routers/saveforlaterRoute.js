const express = require('express')
const router = express.Router();
const saveforlaterControl = require('../controllers/saveforlaterControl')

//Save for later
router.post("/create",saveforlaterControl.CreateSaveForLater);

//display the Save For Later
router.post("/displaysaveforlater",saveforlaterControl.DisplaySaveForLater);

//Delete the Save For Later product
router.post("/deletesaveforlater",saveforlaterControl.DeleteSaveForLater);

//update quantity save for later
router.post("/updateQuantity",saveforlaterControl.UpdateQuantitySaveForLater);

//update Stock save for later
router.post("/updatestock",saveforlaterControl.UpdateSaveForLaterStock);

//update saveforlater product
router.post("/updatesaveforlaterproduct",saveforlaterControl.UpdateSaveForLaterProducts);

//update Stock save for later when delete account
router.post("/updatestockdeleteaccount",saveforlaterControl.UpdateSaveForLaterStockDeleteAccount);

//Delete All the Save For Later Product
router.post("/deleteallsaveforlater", saveforlaterControl.DeleteAllSaveForLaterProduct);

//View Product Form Saveforlater
router.post("/viewproductformsaveforlater",saveforlaterControl.ViewProductFormSaveForLater);

module.exports = router;