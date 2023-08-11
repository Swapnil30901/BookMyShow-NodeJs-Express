const MoviesModel = require("./database/movies");
const UsersModel = require("./database/users");
require('dotenv').config()
const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())

const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongoDB, connectionParams).then(()=>{
    console.log("Connected to the DB");
})
.catch((e) => {
    console.log("Error:", e)
});

app.get('/' , (req,res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company` });
});

app.get('/movies' ,async (req,res) => {
    const getAllMovies = await MoviesModel.find();
    return res.json(getAllMovies);
});

app.get('/movie/:id' ,async (req,res) => {
    const {id} = req.params;
    const getMovie = await MoviesModel.findOne({_id:id});
    return res.json(getMovie);
});

app.post('/user-register' ,async (req,res) => {
    const addNewUser = await UsersModel.create(req.body);
    return res.json({userAdded: addNewUser,  message: "User was added !!!"});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});