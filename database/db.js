const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
       await mongoose.connect(process.env.Mongo_UR);
        console.log("connected")
    }
    catch (e) {
       console.log(e)
    }
}
module.exports = connectToDB;