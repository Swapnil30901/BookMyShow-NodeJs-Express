const mongoose = require("mongoose");

//create books schema
const UsersSchema = mongoose.Schema({
    username: String,
    email:String,
    password:String
    
});

const UsersModel = mongoose.model("users", UsersSchema);

module.exports = UsersModel;