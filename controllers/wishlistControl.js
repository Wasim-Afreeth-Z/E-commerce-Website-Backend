// const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })

// my wishlist create 
const CreateMyWishlist = (req, res) => {
    const { product_id, image, productname, description, price, stock, productcreater, user_id, cat_id, quantity } = req.body;
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
            cat_id: cat_id,
            quantity: quantity,
        };
        let existsProductQuery = 'SELECT * FROM mywishlist WHERE product_id = ? AND  user_id = ?'
        db.query(existsProductQuery, [product_id, user_id], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.status(405).json({ message: "Product Already Added in wishlist" });
            } else {
                // Insert new user into database
                let InsertQuery = "INSERT INTO mywishlist SET ?";
                db.query(InsertQuery, details, (error) => {
                    if (error) throw error;
                    res.status(200).json({ message: "Product added to wishlist" });
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//display the Wishlist
const DisplayWishlist = (req, res) => {
    let user_id = req.body.id
    let sql = "Select w.id, w.product_id, w.productname, w.image, w.description, w.price, w.stock, w.productcreater, w.user_id, w.quantity, w.cat_id, cat.category, 0 isAdded from mywishlist as w LEFT JOIN categories as cat ON w.cat_id = cat.id  where user_id=" + user_id + " ORDER BY id DESC;";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
        } else {
            if (user_id !== null) {
                // add to cart button change added 
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

//Delete the Wishlist product
const DeleteWishlist = (req, res) => {
    let sql = "DELETE FROM mywishlist WHERE id=" + req.body.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to delete the wishlist Product" });
        } else {
            res.send({ status: true, message: "wishlist Product Deleted" });
        }
    });
}

//Update Wishlist stock
const UpdateWishlistStock = (req, res) => {
    let sql =
        "UPDATE mywishlist SET stock='" + req.body.stock +
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

//Update Wishlist products
const UpdateWishlistProduct = (req, res) => {
    const { productname, image, description, price, stock, cat_id } = req.body;
    const product_id = req.body.id;
    try {
        if (!productname) throw new Error('Product Name is Required')
        if (!description) throw new Error('Description is Required')
        if (!price) throw new Error('Price is Required')
        if (!stock) throw new Error('Stock is Required')
        if (!cat_id) throw new Error('Category is Required')
        // update the product
        let sql = "UPDATE mywishlist SET productname=?, image=?, description=?, price=?, stock=?, cat_id=? WHERE product_id=?";
        let details = [productname, image, description, price, stock, cat_id, product_id]
        db.query(sql, details, (error, result) => {
            if (error) {
                res.send({ status: false, message: "Failed to update the mywishlist" });
            } else {
                res.send({ status: true, message: "mywishlist Detail Updated successfully" });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//Update Quantity wish list
const UpdateQuantityWishlist = (req, res) => {
    let sql =
        "UPDATE mywishlist SET quantity='" + req.body.quantity +
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

//Update Wishlist stock Delete Account
const UpdateWishlistStockDeleteAccount = (req, res) => {
    let sql =
        "UPDATE mywishlist SET stock='" + req.body.stock +
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

//Delete All Wishlist Product
const DeleteAllWishlistProduct = (req, res) => {
    let sql = "delete from mywishlist where user_id=" + req.body.id + ";";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to Delete" });
        } else {
            res.send({ status: true, message: "Deleted" });
        }
    });
}

//View Product Form Wishlist
const ViewProductFormWishlist = (req, res) => {
    let sql = `Select w.id, w.product_id, w.productname, w.image, w.description, w.price, w.stock, w.productcreater, w.user_id, w.quantity, w.cat_id,
                cat.category, 0 isAdded
                from mywishlist as w LEFT JOIN categories as cat 
                ON w.cat_id = cat.id
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
    CreateMyWishlist,
    DisplayWishlist,
    DeleteWishlist,
    UpdateWishlistStock,
    UpdateWishlistProduct,
    UpdateQuantityWishlist,
    UpdateWishlistStockDeleteAccount,
    DeleteAllWishlistProduct,
    ViewProductFormWishlist
}