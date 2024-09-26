const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dtuxb2tbc',
    api_key: '683825313271294',
    api_secret: 'tNHfg8D4mCMzmVJfhkKSdbXJLRo',
});

module.exports = cloudinary;