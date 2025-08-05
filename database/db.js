const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
       await mongoose.connect("mongodb://localhost:27017/nodeauth");
        console.log("connected")
    }
    catch (e) {
       console.log(e)
    }
}
module.exports = connectToDB;