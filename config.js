const mongoose = require('mongoose')
const dotenv = require('dotenv')

async function main(){
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewURLParser: true,
      });
      await mongoose.connection;
      console.log(`MongoDB Connected`);
  
}
module.exports = main