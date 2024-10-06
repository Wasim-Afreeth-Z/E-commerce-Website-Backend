const encryptionDecryption = require('../utils/encryptionDecryption');
// const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })

// Create Product
const CreateProduct = async (req, res) => {
    // console.log(req.body);

    const { productname, image, description, price, stock, cat_id, user_id, quantity, created_date, created_time } = req.body;
    try {
        if (!productname) throw new Error('Product Name is Required')
        if (!description) throw new Error('Description is Required')
        if (!price) throw new Error('Price is Required')
        if (!stock) throw new Error('Stock is Required')
        if (!cat_id) throw new Error('Category is Required')
        if (!quantity) throw new Error('Category is Required')
        let details = {
            productname: productname,
            image: image,
            description: description,
            price: price,
            stock: stock,
            cat_id: cat_id,
            user_id: user_id,
            quantity: quantity,
            created_date: created_date,
            created_time: created_time
        };
        let existsProductnameQuery = 'SELECT * FROM products WHERE productname = ? '
        db.query(existsProductnameQuery, [productname], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.status(405).json({ message: "Product Name already exists" });
            } else {
                // Insert new user into database
                let sql = "INSERT INTO products SET ?";
                db.query(sql, details, (error) => {
                    if (error) {
                        res.send({ status: false, message: error });
                    } else {
                        res.send({ status: true, message: "Product Created Successfully" });
                    }
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// !Create Product for multiple image 
// const CreateProduct = async (req, res) => {
//     const { productname, image, description, price, stock, cat_id, user_id, quantity, created_date, created_time } = req.body;
//     try {
//         if (!productname) throw new Error('Product Name is Required')
//         if (!description) throw new Error('Description is Required')
//         if (!price) throw new Error('Price is Required')
//         if (!stock) throw new Error('Stock is Required')
//         if (!cat_id) throw new Error('Category is Required')
//         if (!quantity) throw new Error('Category is Required')

//         const imagesIDs = Array.isArray(image) ? JSON.stringify(image) : image;
//         let details = {
//             productname: productname,
//             image: imagesIDs,
//             description: description,
//             price: price,
//             stock: stock,
//             cat_id: cat_id,
//             user_id: user_id,
//             quantity: quantity,
//             created_date: created_date,
//             created_time: created_time
//         };
//         let existsProductnameQuery = 'SELECT * FROM products WHERE productname = ? '
//         db.query(existsProductnameQuery, [productname], async (error, results) => {
//             if (error) throw error;
//             if (results.length > 0) {
//                 res.status(405).json({ message: "Product Name already exists" });
//             } else {
//                 // Insert details in products table
//                 let sql = `INSERT INTO products SET ?`;
//                 let rows = await db.query(sql, details)

//                 // Insert image_id and Product_id to saperate table
//                 const imageArray = JSON.parse(imagesIDs)
//                 for (let id of imageArray) {
//                     let sql2 = `INSERT INTO product_images SET product_id='${rows.insertId}', image_id='${id}'`
//                     let rows2 = await db.query(sql2)
//                 }
//                 res.send({ status: true, message: "Product Created Successfully"});
//             }
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

//display the Products
const GetProducts = async (req, res) => {
    let user_id = req.body.id
    let sql = "SELECT p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.quantity, p.user_id as productcreater, c.category,0 isAdded,0 isWhislist from products as p INNER JOIN categories as c ON p.cat_id = c.id ORDER BY p.id;";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to show the data");
        } else {
            if (user_id !== null || user_id !== undefined) {
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
                        // add to Whishlist button change added 
                        let sql2 = "select * from mywishlist where user_id=" + user_id;
                        db.query(sql2, async (wishlist_error, wishlist_result) => {
                            if (wishlist_error) {
                                console.log("Unable to show the data");
                            } else {
                                for (let wishlist of wishlist_result) {
                                    let index = result.findIndex(product => wishlist.product_id == product.product_id)
                                    if (index != -1) {
                                        result[index].isWhislist = 1
                                    }
                                }
                                res.send({ status: true, data: result });
                            }
                        });
                    }
                });
            } else {
                res.send({ status: true, data: result });
            }
        }
    });
}

//display the Products BY UserId
const GetProductsByID = (req, res) => {
    let sql = "SELECT p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.quantity, p.user_id as productcreater, c.category from products as p INNER JOIN categories as c ON p.cat_id = c.id where p.user_id= " + req.body.id + " ORDER BY p.id DESC;";
    db.query(sql, async (error, result) => {
        if (error) {
            console.log("Unable to show the data");
            //    console.log(error);
        } else {
            // res.send({ status: true, data: result });
            res.status(200).json(await encryptionDecryption.encryptData(result))
            // console.log(result);
        }
    });
}


//Update the product
const UpdateProduct = (req, res) => {
    const { productname, image, description, price, stock, cat_id } = req.body;
    const productId = req.body.id;
    try {
        if (!productname) throw new Error('Product Name is Required')
        if (!description) throw new Error('Description is Required')
        if (!price) throw new Error('Price is Required')
        if (!stock) throw new Error('Stock is Required')
        if (!cat_id) throw new Error('Category is Required')
        let existsProductnameQuery = 'SELECT * FROM products WHERE productname = ? AND id <> ?'
        db.query(existsProductnameQuery, [productname, productId], (error, results) => {
            if (error) {
                return res.status(500).json({ status: false, message: "existing title", error: error.message, });
            }
            if (results.length > 0) {
                res.status(405).json({ message: "Product Name already exists" });
            } else {
                // update the product
                const sql = "UPDATE products SET productname=?, image=?, description=?, price=?, stock=?, cat_id=? WHERE id=?";
                const details = [productname, image, description, price, stock, cat_id, productId]
                db.query(sql, details, (error, result) => {
                    if (error) {
                        res.send({ status: false, message: "Failed to update the Product" });
                    } else {
                        res.send({ status: true, message: "Product Detail Updated successfully" });
                    }
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//Update Quantity product
const UpdateQuantityProduct = (req, res) => {
    let sql =
        "UPDATE products SET quantity='" + req.body.quantity +
        "'  WHERE id=" + req.body.id;

    let update_Query = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Failed to update the quantity" });
            // console.log(error);
        } else {
            res.send({ status: true, message: "Quantity updated" });
        }
    });
}

//Delete the product
const DeleteProduct = (req, res) => {
    let sql = "DELETE FROM products WHERE id=" + req.body.id + "";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            // console.log(error)
            res.status(200).json({ status: false, message: "Failed to delete the Product" });
            // res.status(200).json({message:"Can't Delete the Product Because User's Cart Or Wishlist Or MyOrders your  Product is There", smallmessage:"Failed"});
        } else {
            res.status(200).json({ message: "Product Deleted Successfully", smallmessage: "Success" });
        }
    });
}

//category List
const categoryList = (req, res) => {
    let sql = "SELECT * FROM categories";
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
    let categoryID = req.body.id;
    let user_id = req.body.user_id;
    let sql = "SELECT  p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.quantity, p.cat_id, p.user_id as productcreater,  c.category,0 isAdded,0 isWhislist from products as p LEFT JOIN categories as c ON p.cat_id = c.id where cat_id=" + categoryID;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to find the data");
        } else {
            if (user_id !== null || user_id !== undefined) {
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
                        // add to Whishlist button change added 
                        let sql2 = "select * from mywishlist where user_id=" + user_id;
                        db.query(sql2, async (wishlist_error, wishlist_result) => {
                            if (wishlist_error) {
                                console.log("Unable to show the data");
                            } else {
                                for (let wishlist of wishlist_result) {
                                    let index = result.findIndex(product => wishlist.product_id == product.product_id)
                                    if (index != -1) {
                                        result[index].isWhislist = 1
                                    }
                                }
                                res.send({ status: true, data: result });
                            }
                        });
                    }
                });
            } else {
                res.send({ status: true, data: result });
            }
        }
    });
}

// category filter for admin dashboard
const categoryFilterForAdmin = (req, res) => {
    let cat_id = req.body.cat_id;
    let user_id = req.body.user_id;

    let sql = "SELECT  p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.quantity, p.cat_id, p.user_id as productcreater, c.category from products as p LEFT JOIN categories as c ON p.cat_id = c.id where cat_id=" + cat_id + " and p.user_id=" + user_id + "";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to find the data");
        } else {
            res.send({ status: true, data: result });
        }
    });
}

//Search Filter
const SearchFilter = (req, res) => {
    let searchInput = req.body.input;
    let user_id = req.body.id;
    let sql = `SELECT  p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.quantity, p.user_id as productcreater,  c.category,0 isAdded,0 isWhislist from products as p LEFT JOIN categories as c ON p.cat_id = c.id where p.productname like '%${searchInput}%'`;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to find the data");
        } else {
            if (user_id !== null || user_id !== undefined) {
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
                        // add to Whishlist button change added 
                        let sql2 = "select * from mywishlist where user_id=" + user_id;
                        db.query(sql2, async (wishlist_error, wishlist_result) => {
                            if (wishlist_error) {
                                console.log("Unable to show the data");
                            } else {
                                for (let wishlist of wishlist_result) {
                                    let index = result.findIndex(product => wishlist.product_id == product.product_id)
                                    if (index != -1) {
                                        result[index].isWhislist = 1
                                    }
                                }
                                res.send({ status: true, data: result });
                            }
                        });
                    }
                });
            } else {
                res.send({ status: true, data: result });
            }
        }
    });
}

//Search Filter For Admin
const SearchFilterForAdmin = (req, res) => {
    let search = req.body.search;
    let user_id = req.body.user_id;
    let sql = `SELECT  p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.quantity, p.user_id as productcreater,  c.category from products as p LEFT JOIN categories as c ON p.cat_id = c.id where p.productname like '%${search}%' and p.user_id="${user_id}"`;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Unable to find the data");
        } else {
            res.send({ status: true, data: result });
        }
    });
}

//Delete All Product
const DeleteAllProduct = (req, res) => {
    let sql = "delete from products where user_id=" + req.body.id + ";";
    let delete_Query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Failed to Delete" });
        } else {
            res.send({ status: true, message: "Deleted" });
        }
    });
}

//view product
const ViewProduct = (req, res) => {
    // console.log(req.body);
    const { user_id, product_id } = req.body;
    let sql = `SELECT p.id as product_id, p.productname, p.image, p.description, p.price, p.stock, p.cat_id, p.quantity, p.user_id as productcreater, 
                c.category, 0 isAdded
                from products as p INNER JOIN categories as c 
                ON p.cat_id = c.id
                where p.id = ${product_id}
                ORDER BY p.id`;
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
                        res.send( result[0] );
                    }
                });
            } else {
                res.send( result[0] );
            }
        }
    });
}

module.exports = {
    CreateProduct,
    GetProducts,
    GetProductsByID,
    UpdateProduct,
    UpdateQuantityProduct,
    DeleteProduct,
    categoryList,
    categoryFilter,
    categoryFilterForAdmin,
    SearchFilter,
    SearchFilterForAdmin,
    DeleteAllProduct,
    ViewProduct
}