const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
dotenv.config();

const {ConnectMongo} = require('./database/connectDb')

const auth = require('./routes/api/auth')
const post = require('./routes/api/post')
const comment = require('./routes/api/comment')

const app = express();
const PORT = 3000;

ConnectMongo.getConnect();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/post", post);
app.use("/api/v1/comment", comment);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.black.bgGreen);
});