// const mysql = require('mysql')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })

module.exports = {
    ProductImage: async function (req, res) {
        try {
            if (req.file === undefined) {
                return res.status(600).json({ status: "failed" })
            }
            const image = `/images/product-images/${req.file.filename}`
            return res.status(200).json({ status: "success", "image": image })
        } catch (error) {
            console.log(error);
        }
    },

    ProductMultipleImage: async function (req, res) {
        // console.log(req.files);
        var ids =[]
        try {
            if (req.files === undefined) {
                return res.status(600).json({ status: "failed" })
            }
            let query = "INSERT INTO images SET ?";
            for (let file of req.files) {
                let details={
                    imageURL:`/images/product-images/${file.filename}`
                }
                let rows = await db.query(query, details)
                ids.push(rows.insertId) 
            }
            return res.status(200).json({ status: "sucess", ids })
            
        } catch (error) {
            console.log(error);
        }
    },

}