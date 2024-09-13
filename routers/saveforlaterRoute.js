const express = require('express')
const router = express.Router();
const saveforlaterControl = require('../controllers/saveforlaterControl')

//Save for later
router.post("/create",saveforlaterControl.CreateSaveForLater);

//display the Save For Later
router.get("/displaysaveforlater/:id",saveforlaterControl.DisplaySaveForLater);

//Delete the Save For Later product
router.delete("/deletesaveforlater/:id",saveforlaterControl.DeleteSaveForLater);

//update quantity save for later
router.put("/updateQuantity/:id",saveforlaterControl.UpdateQuantitySaveForLater);

//update Stock save for later
router.put("/updatestock/:id",saveforlaterControl.UpdateSaveForLaterStock);

//update saveforlater product
router.put("/updatesaveforlaterproduct/:id",saveforlaterControl.UpdateSaveForLaterProducts);

//update Stock save for later when delete account
router.put("/updatestockdeleteaccount/:id",saveforlaterControl.UpdateSaveForLaterStockDeleteAccount);

//Delete All the Save For Later Product
router.delete("/deleteallsaveforlater/:id", saveforlaterControl.DeleteAllSaveForLaterProduct);

//View Product Form Saveforlater
router.post("/viewproductformsaveforlater",saveforlaterControl.ViewProductFormSaveForLater);

module.exports = router;