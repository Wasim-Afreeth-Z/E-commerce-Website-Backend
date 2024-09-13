// const jwt = require("jsonwebtoken");
// const JWT_SECRET = 'ecommerce-secret-key'
const { generateTokenForUser } = require('../utils/auth')
const bcrypt = require('bcrypt') //npm i bcrypt
const salt = 10;
// const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })

//! SignUp
const SignUp = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;
    try {
        if (!firstname) throw new Error('Firstname is Required')
        if (!lastname) throw new Error('Lastname is Required')
        if (!email) throw new Error('Email is Required')
        if (!password) throw new Error('Password is Required')
        if (!role) throw new Error('role is Required')
        let details = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            role: role
        };
        let existsEmailUsernameQuery = 'SELECT * FROM users WHERE email = ? '
        db.query(existsEmailUsernameQuery, [email], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.status(405).json({ message: "Email already exists" });
            } else {
                // Insert new user into database
                let InsertQuery = "INSERT INTO users SET ?";
                db.query(InsertQuery, details, (error) => {
                    if (error) throw error;
                    res.status(200).json({ message: "SignUp Successfully" });
                });
            }
        })
    } catch (error) {
        console.log("unable to SignUp");
    }
}

//! SignUp encrpted password save in the database
// const SignUp = async (req, res) => {
//     const { firstname, lastname, email, password, role } = req.body;
//     bcrypt.hash(password.toString(), salt, (error, hash) => {
//         if (error) {
//             console.log(error);
//         }
//         try {
//             if (!firstname) throw new Error('Firstname is Required')
//             if (!lastname) throw new Error('Lastname is Required')
//             if (!email) throw new Error('Email is Required')
//             if (!password) throw new Error('Password is Required')
//             if (!role) throw new Error('Role is Required')
//             let details = {
//                 firstname: firstname,
//                 lastname: lastname,
//                 email: email,
//                 password: hash,
//                 role: role
//             };
//             let existsEmailUsernameQuery = 'SELECT * FROM users WHERE email = ? '
//             db.query(existsEmailUsernameQuery, [email], (error, results) => {
//                 if (error) throw error;
//                 if (results.length > 0) {
//                     res.status(405).json({ message: "Email already exists" });
//                 } else {
//                     // Insert new user into database
//                     let InsertQuery = "INSERT INTO users SET ?";
//                     db.query(InsertQuery, details, (error) => {
//                         if (error) throw error;
//                         res.status(200).json({ message: "SignUp Successfully" });
//                     });
//                 }
//             })
//         } catch (error) {
//             console.log("unable to SignUp");
//         }
//     })
// }

//!Login
const Login = (req, res) => {
    const { email, password } = req.body;
    let CheckEmailPasswordQuery = "SELECT * FROM users WHERE email = ? AND password = ?"
    db.query(CheckEmailPasswordQuery, [email, password], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "server error" });
            return;
        }
        if (results.length > 0) {
            // Token generate
            const user = results[0];
            const token = generateTokenForUser(user)
            // const payload = {
            //     userId: user.id,
            //     email: user.email
            // }
            // const token = jwt.sign(payload, JWT_SECRET)

            res.status(200).json({
                message: "Login successful",
                token: token,
                userId: user.id,
                role: user.role
                //  firstname: user.firstname, 
                //  lastname: user.lastname, 
                //  username: user.username, 
                //  email: user.email, 
                //  password:user.password,
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    })
}

//! Login with encrpted password
// const Login = (req, res) => {
//     const { email, password } = req.body;
//     let CheckEmailPasswordQuery = "SELECT * FROM users WHERE email = ?"
//     db.query(CheckEmailPasswordQuery, [email], (error, results) => {
//         if (error) {
//             console.error(error);
//             res.status(500).json({ message: "server error" });
//             return;
//         }
//         if (results.length > 0) {
//             bcrypt.compare(password.toString(), results[0].password, (error, response) => {
//                 if (response) {
//                     // Token generate
//                     const user = results[0];
//                     const token = generateTokenForUser(user)
//                     // const payload = {
//                     //     userId: user.id,
//                     //     email: user.email
//                     // }
//                     // const token = jwt.sign(payload, JWT_SECRET)

//                     res.status(200).json({
//                         message: "Login successful",
//                         token: token,
//                         userId: user.id,
//                         role: user.role
//                         //  firstname: user.firstname, 
//                         //  lastname: user.lastname, 
//                         //  username: user.username, 
//                         //  email: user.email, 
//                         //  password:user.password,
//                     });
//                 }else{
//                     console.error(error);
//                     return res.status(500).json({ message: "Invalid password" });
//                 }

//             })
//         } else {
//             res.status(500).json({ message: "Invalid email" });
//         }
//     })
// }

// token save to database in users table
const Token = (req, res) => {
    let sql = "UPDATE users SET token='" + req.body.token + "'WHERE id=" + req.body.id + "";
    db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to save a token" });
            console.log(error);
        } else {
            res.send({ status: true, message: "token Saved" });
        }
    });
}

// remove token form database in users table when logout
const TokenRemove = (req, res) => {
    let sql = "UPDATE users SET token=null WHERE id=" + req.body.id + "";
    db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to remove a token" });
            console.log(error);
        } else {
            res.send({ status: true, message: "token Removed" });
        }
    });
}

//display the userDetail
const GetUser = (req, res) => {
    let sql = "SELECT * FROM users Where id = " + req.params.id + "";
    db.query(sql, (error, results) => {
        if (error) {
            console.log("Unable to show the user data");
            console.log(error);
        } else {
            const user = results[0];
            res.status(200).json({
                status: true,
                userId: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                // username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
            });
        }
    });
}

// ! Update the myAccount
const UpdateMyAccount = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const user_id = req.params.id
    try {
        if (!firstname) throw new Error('Firstname is Required')
        if (!lastname) throw new Error('Lastname is Required')
        if (!email) throw new Error('Email is Required')
        if (!password) throw new Error('Password is Required')
        let existsEmailUsernameQuery = 'SELECT * FROM users WHERE email = ? AND id <> ?'
        db.query(existsEmailUsernameQuery, [email, user_id], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.status(405).json({ message: "Email already exists" });
            } else {
                // update user detail into database
                let sql =
                    "UPDATE users SET firstname='" + firstname +
                    "', lastname='" + lastname +
                    "',email='" + email +
                    "',password='" + password +
                    "'  WHERE id=" + req.params.id;

                let update_Query = db.query(sql, (error, result) => {
                    if (error) {
                        res.send({ status: false, message: "Failed to update the user Detail" });
                        console.log(error);
                    } else {
                        res.send({ status: true, message: "User Detail Updated successfully" });
                    }
                });
            }
        })
    } catch (error) {
        console.log("unable to update");
        console.log(error);
    }
}

//! Update the myAccount and update encrypted password
// const UpdateMyAccount = (req, res) => {
//     const { firstname, lastname, email, password } = req.body;
//     const user_id = req.params.id

//     bcrypt.hash(password.toString(), salt, (error, hash) => {
//         if (error) {
//             console.log(error);
//         }
//         try {
//             if (!firstname) throw new Error('Firstname is Required')
//             if (!lastname) throw new Error('Lastname is Required')
//             if (!email) throw new Error('Email is Required')
//             if (!password) throw new Error('Password is Required')
//             let existsEmailUsernameQuery = 'SELECT * FROM users WHERE email = ? AND id <> ?'
//             db.query(existsEmailUsernameQuery, [email, user_id], (error, results) => {
//                 if (error) throw error;
//                 if (results.length > 0) {
//                     res.status(405).json({ message: "Email already exists" });
//                 } else {
//                     // update user detail into database
//                     let sql =
//                         "UPDATE users SET firstname='" + firstname +
//                         "', lastname='" + lastname +
//                         "',email='" + email +
//                         "',password='" + hash +
//                         "'  WHERE id=" + req.params.id;

//                     let update_Query = db.query(sql, (error, result) => {
//                         if (error) {
//                             res.send({ status: false, message: "Failed to update the user Detail" });
//                             console.log(error);
//                         } else {
//                             res.send({ status: true, message: "User Detail Updated successfully" });
//                         }
//                     });
//                 }
//             })
//         } catch (error) {
//             console.log("unable to update");
//             console.log(error);
//         }
//     })
// }

//Delete myaccount
const DeleteMyAccount = (req, res) => {
    let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            console.log(error);
            res.send({ status: false, message: "Failed to delete the User Account" });
        } else {
            res.send({ status: true, message: "User Account Deleted successfully" });
        }
    });
}

module.exports = {
    SignUp,
    Login,
    Token,
    TokenRemove,
    GetUser,
    UpdateMyAccount,
    DeleteMyAccount
}