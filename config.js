const mongoose = require('mongoose')
const dotenv = require('dotenv')

async function main(){
    await mongoose.connect(process.env.MONGOOSE_URI)
}
module.exports = main