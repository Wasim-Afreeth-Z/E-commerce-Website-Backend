
// const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })


//display the Admin in list
const DisplayAdmins = async (req, res) => {
    let sql = "SELECT * from users where role = 'admin';";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
            //    console.log(error);
            error
        } else {
            res.send({ status: true, data: result });
            // console.log(result);
        }
    });
}

//! CreateAdmin
// const CreateAdmin = async (req, res) => {
//     const { firstname, lastname, email, password } = req.body;
//     try {
//         if (!firstname) throw new Error('Firstname is Required')
//         if (!lastname) throw new Error('Lastname is Required')
//         if (!email) throw new Error('Email is Required')
//         if (!password) throw new Error('Password is Required')
//         let details = {
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             password: password,
//             role: "admin"
//         };
//         let existsEmailUsernameQuery = 'SELECT * FROM users WHERE email = ? '
//         db.query(existsEmailUsernameQuery, [email], (error, results) => {
//             if (error) throw error;
//             if (results.length > 0) {
//                 res.status(405).json({ message: "Email already exists" });
//             } else {
//                 // Insert new user into database
//                 let InsertQuery = "INSERT INTO users SET ?";
//                 db.query(InsertQuery, details, (error) => {
//                     if (error) throw error;
//                     res.status(200).json({ message: "Admin Created" });
//                 });
//             }
//         })
//     } catch (error) {
//         console.log("unable to create");
//     }
// }

// ! Update Admin Details
// const UpdateAdminDetails = (req, res) => {
//     const { firstname, lastname, email, password } = req.body;
//     const user_id = req.params.id
//     try {
//         if (!firstname) throw new Error('Firstname is Required')
//         if (!lastname) throw new Error('Lastname is Required')
//         if (!email) throw new Error('Email is Required')
//         if (!password) throw new Error('Password is Required')
//         let existsEmailUsernameQuery = 'SELECT * FROM users WHERE email = ? AND id <> ?'
//         db.query(existsEmailUsernameQuery, [email, user_id], (error, results) => {
//             if (error) throw error;
//             if (results.length > 0) {
//                 res.status(405).json({ message: "Email already exists" });
//             } else {
//                 // update user detail into database
//                 let sql =
//                     "UPDATE users SET firstname='" + firstname +
//                     "', lastname='" + lastname +
//                     "',email='" + email +
//                     "',password='" + password +
//                     "'  WHERE id=" + req.params.id;

//                 let update_Query = db.query(sql, (error, result) => {
//                     if (error) {
//                         res.send({ status: false, message: "Failed to update the admin Detail" });
//                         console.log(error);
//                     } else {
//                         res.send({ status: true, message: "Admin Detail Updated successfully" });
//                     }
//                 });
//             }
//         })
//     } catch (error) {
//         console.log("unable to update");
//         console.log(error);
//     }
// }

//Delete admin
const DeleteAdmin = (req, res) => {
    let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            console.log(error);
            res.send({ status: false, message: "Failed to delete the Admin" });
        } else {
            res.send({ status: true, message: "Admin Deleted successfully" });
        }
    });
}

module.exports = {
    DisplayAdmins,
    // CreateAdmin,
    // UpdateAdminDetails,
    DeleteAdmin
}