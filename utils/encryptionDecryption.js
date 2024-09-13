const cryptoJs = require('crypto-js') //npm i crypto-js
const SecretKey = 'ecommerce-website-secretkey'


module.exports = {
    decryptData: async function (payload) {
        // console.log(payload);
        let decryptData = cryptoJs.AES.decrypt(payload.data, SecretKey).toString(cryptoJs.enc.Utf8)
        let decryption = JSON.parse(decryptData);
        // console.log(decryption);
        return decryption
    },

    encryptData: async function (payload) {
        // console.log(payload);
        let encryptData = cryptoJs.AES.encrypt(JSON.stringify(payload), SecretKey).toString()
        // console.log(encrypted);
        let encryption = JSON.parse(JSON.stringify(encryptData))
        // console.log(typeof encryptData);
        // console.log(encryptData);
        // return { data: encryption }
        return encryption
    }
}