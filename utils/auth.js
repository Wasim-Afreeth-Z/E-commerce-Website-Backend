const jwt = require("jsonwebtoken");
const JWT_SECRET = 'ecommerce-secret-key'

// generate token
const generateTokenForUser = (user) => {
    const payload = {
        userId: user.id,
        email: user.email
    }
    const token = jwt.sign(payload, JWT_SECRET)
    return token;
}

module.exports={
    generateTokenForUser,
}