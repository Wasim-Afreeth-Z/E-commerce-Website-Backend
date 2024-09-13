const express = require('express')
const router = express.Router();
const userControl = require('../controllers/userControl')
const {userSchema, validation}= require('../Middlewares/ValidationUserData')

//SignUp
router.post("/signup", validation(userSchema), userControl.SignUp);

// Login
router.post("/login", userControl.Login);

// token save to database in users table
router.post("/token", userControl.Token);

// remove token form database in users table when logout
router.post("/tokenremove", userControl.TokenRemove);

// get user detail
router.get("/getuser/:id", userControl.GetUser);

// Update user detail
router.put("/update/:id",validation(userSchema), userControl.UpdateMyAccount);

// Delete user Account
router.delete("/delete/:id", userControl.DeleteMyAccount);

module.exports = router;