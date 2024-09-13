const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "ecommerce_website_db"
})

const TokenCheck = async (req, res, next) => {
    const { token, id } = await req.headers;
    // console.log(req.headers);

    let sql = "SELECT * FROM users WHERE id=? ;"
    db.query(sql, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "server error" });
            return;
        }
        const user = results[0];
        if (user.token === token) {
            // res.status(200).json({ message: "Token was Mached" })
            next()
        } else {
            return res.status(404).json({ message: "Token doesn't Match Or Missing Please re-Login" })
        }

    })
}

module.exports = {
    TokenCheck
}