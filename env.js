require('dotenv').config();

const env = {
    username : process.env.MONGO_USERNAME,
    password : process.env.MONGO_PASSWORD,
    port : process.env.PORT
}

module.exports = env;