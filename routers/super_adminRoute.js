const express = require('express')
const router = express.Router();
const Super_AdminControl = require('../controllers/super_admin')

//Display the product list
router.get("/display", Super_AdminControl.DisplayProducts);

//Search filter for products
router.post("/search-product", Super_AdminControl.SearchFilterForProducts);

//category filter
router.post("/category", Super_AdminControl.categoryFilter);

//Display the user list
router.get("/display-user", Super_AdminControl.DisplayUsers);

// Delete user
router.post("/delete-user", Super_AdminControl.DeleteUser);

module.exports = router;