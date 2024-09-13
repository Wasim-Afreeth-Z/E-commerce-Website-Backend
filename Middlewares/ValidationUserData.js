// validation signup data
const yup = require("yup") //npm i yup
let userSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email("Enter correct Format Email").required(),
    password: yup.string().min(8).required()
});

const validation = (schema) => async (req, res, next) => {
    const body = req.body

    try {
        await schema.validate(body)
        next()
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = {
    userSchema,
    validation
}