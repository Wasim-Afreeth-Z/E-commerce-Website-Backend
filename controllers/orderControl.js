// const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })

// my cart create 
const CreatemyCart = (req, res) => {
    const { product_id, productname, description, image, price, stock, productcreater, user_id, quantity, cat_id } = req.body;
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
        let existsProductQuery = 'SELECT * FROM mycart WHERE product_id = ? AND  user_id = ?'
        db.query(existsProductQuery, [product_id, user_id], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.status(405).json({ message: "Product Already Added in cart" });
            } else {
                // Insert new user into database
                let InsertQuery = "INSERT INTO mycart SET ?";
                db.query(InsertQuery, details, (error) => {
                    if (error) throw error;
                    res.status(200).json({ message: "Product added to cart" });
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//Update Quantity cart In Home page
const UpdateQuantityCartInHome = (req, res) => {
    let sql =
        "UPDATE mycart SET quantity='" + req.body.quantity +
        "'  WHERE product_id=" + req.body.product_id + " AND user_id =" + req.body.user_id + "";

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the quantity" });
            console.log(error);
        } else {
            res.send({ status: true, message: "Quantity updated" });
        }
    });
}



//display the cart
const DisplayCart = (req, res) => {
    let sql = "Select c.id, c.product_id, c.productname, c.image, c.description, c.price, c.stock, c.productcreater, c.user_id, c.quantity, c.cat_id, cat.category from mycart as c LEFT JOIN categories as cat ON c.cat_id = cat.id where user_id=" + req.body.id + " AND stock='In Stock' ORDER BY id DESC;";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
            //    console.log(error);
            // error
        } else {
            res.send({ status: true, data: result });
            // console.log(result);
        }
    });
}

//View Product Form Cart
const ViewProductFormCart = (req, res) => {
    // console.log(req.body);
    
    let sql = "Select c.id, c.product_id, c.productname, c.image, c.description, c.price, c.stock, c.productcreater, c.user_id, c.quantity, c.cat_id, cat.category from mycart as c LEFT JOIN categories as cat ON c.cat_id = cat.id where product_id=" + req.body.product_id + " AND user_id=" + req.body.user_id;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
        } else {
            res.send(result[0]);
            // console.log(result);
        }
    });
}

//display the cart Out Of Stock
const DisplayCartOutofStock = (req, res) => {
    let sql = "Select c.id, c.product_id, c.productname, c.image, c.description, c.price, c.stock, c.productcreater, c.user_id, c.quantity, c.cat_id, cat.category from mycart as c LEFT JOIN categories as cat ON c.cat_id = cat.id where user_id=" + req.body.id + " AND stock='Out of Stock' ORDER BY id DESC;";
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

//Update Quantity cart
const UpdateQuantityCart = (req, res) => {
    let sql =
        "UPDATE mycart SET quantity='" + req.body.quantity +
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

//Delete the cart product
const DeleteCart = (req, res) => {
    let sql = "DELETE FROM mycart WHERE id=" + req.body.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to delete the cart" });
        } else {
            res.send({ status: true, message: "Cart Deleted" });
        }
    });
}

//address 
// const AddAddress = (req, res) => {
//     const { CustomerName, email, address, city, state, pincode, telephone, user_id } = req.body;
//     try {
//         if (!CustomerName) throw new Error('Name is Required')
//         if (!email) throw new Error('email is Required')
//         if (!address) throw new Error('address is Required')
//         if (!city) throw new Error('city is Required')
//         if (!state) throw new Error('state is Required')
//         if (!pincode) throw new Error('pincode is Required')
//         if (!telephone) throw new Error('telephone is Required')
//         let details = {
//             CustomerName: CustomerName,
//             email: email,
//             address: address,
//             city: city,
//             state: state,
//             pincode: pincode,
//             telephone: telephone,
//             user_id: user_id
//         };
//         // Insert new address into database
//         let InsertQuery = "INSERT INTO address SET ?";
//         db.query(InsertQuery, details, (error) => {
//             if (error) throw error;
//             res.status(200).json({ message: "Address was Saved" });
//         });
//     } catch (error) {
//         // console.log(error);
//     }
// }

// my Order create 
const MyOrder = (req, res) => {
    const { product_id, image, productname, description, price, stock, productcreater, user_id, quantity, ordereddate, deliverydate, orderstatus, CustomerName, email, address, city, state, pincode, telephone } = req.body;
    try {
        if (!productname) throw new Error('Product Name is Required')
        if (!description) throw new Error('Description is Required')
        if (!price) throw new Error('Price is Required')
        if (!stock) throw new Error('Stock is Required')
        if (!productcreater) throw new Error('productcreater is Required')
        if (!CustomerName) throw new Error('Name is Required')
        if (!email) throw new Error('email is Required')
        if (!address) throw new Error('address is Required')
        if (!city) throw new Error('city is Required')
        if (!state) throw new Error('state is Required')
        if (!pincode) throw new Error('pincode is Required')
        if (!telephone) throw new Error('telephone is Required')
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
            ordereddate: ordereddate,
            deliverydate: deliverydate,
            orderstatus: orderstatus,
            CustomerName: CustomerName,
            email: email,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            telephone: telephone
        };
        // Insert new myOrder into database
        let InsertQuery = "INSERT INTO myorders SET ?";
        db.query(InsertQuery, details, (error) => {
            if (error) throw error;
            res.status(200).json({ message: "Order was Placed" });
        });
    } catch (error) {
        // console.log(error);
    }
}

//After Order Placed clear the cart
const ClearCart = (req, res) => {
    let sql = "delete from mycart where user_id=" + req.body.id + " AND stock='In Stock';";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to Clear the Cart" });
        } else {
            res.send({ status: true, message: "Cart Was Cleared" });
        }
    });
}

//Delete All Cart Product
const DeleteAllCartProduct = (req, res) => {
    let sql = "delete from mycart where user_id=" + req.body.id + ";";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to delete the Cart product" });
        } else {
            res.send({ status: true, message: "Cart All Product deleted" });
        }
    });
}

//display my Orders
const DisplayMyOrders = (req, res) => {
    let sql = "select  id as orderid, product_id, quantity, ordereddate, deliverydate, orderstatus, user_id as customerid, CustomerName, email, address, city, state, pincode, telephone, productname, image, description, price , productcreater from myorders  where user_id=" + req.body.id + " ORDER BY id DESC;";
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

//display my Orders in Dashboard
const DisplayMyOrdersDashboard = (req, res) => {
    let sql = "select  id as orderid, product_id, quantity, ordereddate, deliverydate, orderstatus, user_id as customerid, CustomerName, email, address, city, state, pincode, telephone, productname, image, description, price , productcreater from myorders  where productcreater=" + req.body.id + " ORDER BY id DESC;";
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

//display the Address
// const DisplayAddress = (req, res) => {
//     let sql = "select * from address where user_id=" + req.params.id + " ORDER BY id DESC limit 1;";
//     db.query(sql, (error, result) => {
//         if (error) {
//             console.log("Unable to show the data");
//             //    console.log(error);
//             error
//         } else {
//             res.send({ status: true, data: result });
//             // console.log(result);
//         }
//     });
// }

//Update order-status
const Updatestatus = (req, res) => {
    let sql =
        "UPDATE myorders SET orderstatus='" + req.body.orderstatus +
        "'  WHERE id=" + req.body.id;

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the status" });
            console.log(error);
        } else {
            res.send({ status: true, message: "status updated" });
        }
    });
}

//Update order-status Delete Account
const UpdatestatusDeleteAccount = (req, res) => {
    let sql =
        "UPDATE myorders SET orderstatus='" + req.body.orderstatus +
        "'  WHERE productcreater=" + req.body.id;

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the status" });
            console.log(error);
        } else {
            res.send({ status: true, message: "status updated" });
        }
    });
}

// Update cart stock
const UpdateCartstock = (req, res) => {
    let sql =
        "UPDATE mycart SET stock='" + req.body.stock +
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

//Update cart product
const UpdateCartProduct = (req, res) => {
    const { productname, image, description, price, stock, cat_id } = req.body;
    const product_id = req.body.id;
    try {
        if (!productname) throw new Error('Product Name is Required')
        if (!description) throw new Error('Description is Required')
        if (!price) throw new Error('Price is Required')
        if (!stock) throw new Error('Stock is Required')
        if (!cat_id) throw new Error('Category is Required')
        // update the product
        let sql = "UPDATE mycart SET productname=?, image=?, description=?, price=?, stock=?, cat_id=? WHERE product_id=?";
        let details = [productname, image, description, price, stock, cat_id, product_id]
        db.query(sql, details, (error, result) => {
            if (error) {
                res.send({ status: false, message: "Failed to update the cart" });
            } else {
                res.send({ status: true, message: "cart Detail Updated successfully" });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//Update cart stock Delete Account
const UpdateCartstockDeleteAccount = (req, res) => {
    let sql =
        "UPDATE mycart SET stock='" + req.body.stock +
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




module.exports = {
    CreatemyCart,
    UpdateQuantityCartInHome,
    DisplayCart,
    ViewProductFormCart,
    DisplayCartOutofStock,
    UpdateQuantityCart,
    DeleteCart,
    // AddAddress,
    MyOrder,
    ClearCart,
    DeleteAllCartProduct,
    DisplayMyOrders,
    DisplayMyOrdersDashboard,
    // DisplayAddress,
    Updatestatus,
    UpdatestatusDeleteAccount,
    UpdateCartstock,
    UpdateCartProduct,
    UpdateCartstockDeleteAccount
}