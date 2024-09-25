const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser') // npm i cookie-parser
// const mysql = require('mysql2')
const cors = require('cors')
const app = express();

const userRouter = require('./routers/userRoute')
const productsRouter = require('./routers/productsRoute')
const orderRouter = require('./routers/orderRoute')
const wishlistRouter = require('./routers/wishlistRoute')
const saveforlaterRouter = require('./routers/saveforlaterRoute')
const AdminRouter = require('./routers/adminRoute')
const Super_AdminRouter = require('./routers/super_adminRoute')

// database connection
global.db = require('./database/db')
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "ecommerce_website_db"
// })

// db.connect((error) => {
//     if (error) {
//         console.log("Failed to connect to the database");
//         // console.log(error);
//     } else {
//         console.log("Successfully Connected to DB");
//     }
// })

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))  // Help to read the data from the (form)
app.use(cookieParser())
app.use(cors())
// app.use('/public/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, './public')))

//Register  Routes
app.use('/user', userRouter)
app.use('/products', productsRouter)
app.use('/order', orderRouter)
app.use('/wishlist', wishlistRouter)
app.use('/saveforlater', saveforlaterRouter)
app.use('/admin', AdminRouter)
app.use('/super_admin', Super_AdminRouter)

// Listener
const PORT = process.env.PORT || 3306
app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`))
