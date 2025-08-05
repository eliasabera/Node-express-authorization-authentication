
const express = require("express");
const connectToDB = require("./database/db");
const authrouter = require("./routes/auth-router");
const homerouter = require("./routes/home");
const adminrouter = require("./routes/admin");
const uploadImage = require('./routes/image-router')
const changePassword = require('./routes/update-pass')
const deleteImage=require('./routes/image-delete')
connectToDB();

const app = express();
const Port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", authrouter);
app.use("/api/home", homerouter);
app.use("/api/admin", adminrouter);
app.use("/api/image", uploadImage)
app.use('/api/password', changePassword)
app.use("/api/delete", deleteImage)




app.listen(Port, () => {
  console.log(`the server running on port ${Port}`);
});
