const express = require('express')
const router = express.Router();
const Super_AdminControl = require('../controllers/super_admin')

//Display the product list
router.get("/display", Super_AdminControl.DisplayProducts);

//Search filter for products
router.get("/search-product/:id", Super_AdminControl.SearchFilterForProducts);

//category filter
router.get("/category/:id", Super_AdminControl.categoryFilter);

//Display the user list
router.get("/display-user", Super_AdminControl.DisplayUsers);

// Delete user
router.delete("/delete-user/:id", Super_AdminControl.DeleteUser);

module.exports = router;