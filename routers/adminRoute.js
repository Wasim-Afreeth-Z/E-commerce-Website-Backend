const express = require('express')
const router = express.Router();
const AdminControl = require('../controllers/adminControl')
const {userSchema, validation}= require('../Middlewares/ValidationUserData')

//Display the Admin list
router.get("/display", AdminControl.DisplayAdmins);

//create the admin
// router.post("/create", validation(userSchema), AdminControl.CreateAdmin);

// Update admin detail
// router.put("/update/:id",validation(userSchema), AdminControl.UpdateAdminDetails);

// Delete Admin
router.delete("/delete/:id", AdminControl.DeleteAdmin);


module.exports = router;