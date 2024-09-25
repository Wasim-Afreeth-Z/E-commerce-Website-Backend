// const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })

// save for later create 
const CreateSaveForLater = (req, res) => {
    const { product_id,image, productname, description, price, stock, productcreater, user_id, quantity, cat_id } = req.body;
    try {
        if (!product_id) throw new Error('Product_id is Required')
        if (!productname) throw new Error('Product Name is Required')
        if (!description) throw new Error('Description is Required')
        if (!price) throw new Error('Price is Required')
        if (!stock) throw new Error('Stock is Required')
        if (!productcreater) throw new Error('productcreater is Required')
        if (!user_id) throw new Error('user_id is Required')
        let details = {
            product_id: product_id,
            productname: productname,
            image: image,
            description: description,
            price: price,
            stock: stock,
            productcreater: productcreater,
            user_id: user_id,
            quantity: quantity,
            cat_id: cat_id
        };
        let existsProductQuery = 'SELECT * FROM saveforlater WHERE product_id = ? AND  user_id = ?'
        db.query(existsProductQuery, [product_id, user_id], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.status(405).json({ message: "Product Already in Save For Later" });
            } else {
                // Insert new user into database
                let InsertQuery = "INSERT INTO saveforlater SET ?";
                db.query(InsertQuery, details, (error) => {
                    if (error) throw error;
                    res.status(200).json({ message: "Product added to Save For Later" });
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//display the Save For Later
const DisplaySaveForLater = (req, res) => {
    let user_id = req.body.id
    let sql = "Select s.id, s.product_id, s.productname, s.image, s.description, s.price, s.stock, s.productcreater, s.user_id, s.quantity, s.cat_id, cat.category, 0 isAdded from saveforlater as s LEFT JOIN categories as cat ON s.cat_id = cat.id where user_id=" + user_id + " ORDER BY id DESC;";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
        } else {
            if (user_id !== null) {
                // move to cart button change added 
                let sql = "select * from mycart where user_id=" + user_id;
                db.query(sql, async (cart_error, cart_result) => {
                    if (cart_error) {
                        console.log("Unable to show the data");
                    } else {
                        for (let cart of cart_result) {
                            let index = result.findIndex(product => cart.product_id == product.product_id)
                            if (index != -1) {
                                result[index].isAdded = 1
                            }
                        }
                        res.send({ status: true, data: result });
                    }
                });
            } else {
                res.send({ status: true, data: result });
            }
        }
    });
}

//Delete the Save For Later product
const DeleteSaveForLater = (req, res) => {
    let sql = "DELETE FROM saveforlater WHERE id=" + req.body.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to delete the SaveForLater Product" });
        } else {
            res.send({ status: true, message: "SaveForLater Product Deleted" });
        }
    });
}

//Update Quantity Save For Later
const UpdateQuantitySaveForLater = (req, res) => {
    let sql =
        "UPDATE saveforlater SET quantity='" + req.body.quantity +
        "'  WHERE id=" + req.body.id;

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the quantity" });
            console.log(error);
        } else {
            res.send({ status: true, message: "Quantity updated" });
        }
    });
}

//Update saveforlater stock
const UpdateSaveForLaterStock = (req, res) => {
    let sql =
        "UPDATE saveforlater SET stock='" + req.body.stock +
        "'  WHERE product_id=" + req.body.id;

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the stock" });
            console.log(error);
        } else {
            res.send({ status: true, message: "stock updated" });
        }
    });
}

//Update saveforlater products
const UpdateSaveForLaterProducts = (req, res) => {
    const { productname, image, description, price, stock, cat_id } = req.body;
    const product_id = req.body.id;
    try {
        if (!productname) throw new Error('Product Name is Required')
        if (!description) throw new Error('Description is Required')
        if (!price) throw new Error('Price is Required')
        if (!stock) throw new Error('Stock is Required')
        if (!cat_id) throw new Error('Category is Required')
         // update the product
        let sql = "UPDATE saveforlater SET productname=?, image=?, description=?, price=?, stock=?, cat_id=? WHERE product_id=?";
        let details = [productname, image, description, price, stock, cat_id, product_id]
        db.query(sql, details, (error, result) => {
            if (error) {
                res.send({ status: false, message: "Failed to update the saveforlater" });
            } else {
                res.send({ status: true, message: "saveforlater Detail Updated successfully" });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//Update saveforlater stock Delete Account
const UpdateSaveForLaterStockDeleteAccount = (req, res) => {
    let sql =
        "UPDATE saveforlater SET stock='" + req.body.stock +
        "'  WHERE productcreater=" + req.body.id;

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the stock" });
            console.log(error);
        } else {
            res.send({ status: true, message: "stock updated" });
        }
    });
}

//Delete All Save For Later Product
const DeleteAllSaveForLaterProduct = (req, res) => {
    let sql = "delete from saveforlater where user_id=" + req.body.id + ";";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to Delete" });
        } else {
            res.send({ status: true, message: "Deleted" });
        }
    });
}

//View Product Form Wishlist
const ViewProductFormSaveForLater = (req, res) => {
    let sql = `Select s.id, s.product_id, s.productname, s.image, s.description, s.price, s.stock, s.productcreater, s.user_id, s.quantity, s.cat_id,
                cat.category, 0 isAdded
                from saveforlater as s LEFT JOIN categories as cat 
                ON s.cat_id = cat.id
                where product_id=${req.body.product_id} AND user_id=${req.body.user_id}; `;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
        } else {
            if (req.body.user_id !== null) {
                // add to cart button change added 
                let sql = "select * from mycart where user_id=" + req.body.user_id;
                db.query(sql, async (cart_error, cart_result) => {
                    if (cart_error) {
                        console.log("Unable to show the data");
                    } else {
                        for (let cart of cart_result) {
                            let index = result.findIndex(product => cart.product_id == product.product_id)
                            if (index != -1) {
                                result[index].isAdded = 1
                            }
                        }
                        res.send(result[0]);
                    }
                });
            } else {
                res.send(result[0]);
            }
        }
    });
}

module.exports = {
    CreateSaveForLater,
    DisplaySaveForLater,
    DeleteSaveForLater,
    UpdateQuantitySaveForLater,
    UpdateSaveForLaterStock,
    UpdateSaveForLaterProducts,
    DeleteAllSaveForLaterProduct,
    UpdateSaveForLaterStockDeleteAccount,
    ViewProductFormSaveForLater 
}