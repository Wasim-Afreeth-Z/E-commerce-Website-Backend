// const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })


//display the products
const DisplayProducts = async (req, res) => {
    let sql = "SELECT p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.user_id as productcreater,p.created_date, p.created_time, u.firstname, u.lastname, u.email, c.category from products as p  left JOIN users as u ON p.user_id = u.id left JOIN categories as c ON p.cat_id = c.id ORDER BY p.id DESC;";
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

//Search Filter For Products
const SearchFilterForProducts = (req, res) => {
    let searchInput = req.params.id;
    let sql = `SELECT p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.user_id as productcreater,p.created_date, p.created_time, u.firstname, u.lastname, u.email, c.category from products as p left JOIN users as u ON p.user_id = u.id left JOIN categories as c ON p.cat_id = c.id where p.productname like '%${searchInput}%' ORDER BY p.id DESC;`;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to find the data");
        } else {
            res.send({ status: true, data: result });
        }
    });
}

//category filter 
const categoryFilter = (req, res) => {
    let categoryID = req.params.id;
    let sql = `SELECT p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.user_id as productcreater,p.created_date, p.created_time, u.firstname, u.lastname, u.email, c.category from products as p left JOIN users as u ON p.user_id = u.id left JOIN categories as c ON p.cat_id = c.id where p.cat_id=${categoryID} ORDER BY p.id DESC;`;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to find the data");
        } else {
            res.send({ status: true, data: result });
        }
    });
}

//display the user in list
const DisplayUsers = async (req, res) => {
    let sql = "SELECT * from users where role = 'user';";
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

//Delete user
const DeleteUser = (req, res) => {
    let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            console.log(error);
            res.send({ status: false, message: "Failed to delete the User" });
        } else {
            res.send({ status: true, message: "User Deleted successfully" });
        }
    });
}

module.exports = {
    DisplayProducts,
    SearchFilterForProducts,
    categoryFilter,
    DisplayUsers,
    DeleteUser
}