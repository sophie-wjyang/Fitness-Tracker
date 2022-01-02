const express = require('express');
const cors = require('cors'); //CORS stands for Cross-Origin Resource Sharing. It's a node.js package that allows us to relax the security applied to an API.
const mongoose = require('mongoose');

// so we can have our environment variables in the .env file
require('dotenv').config();

// how we create express server 
const app = express();
const port = process.env.PORT || 5000; //port that server will be on

app.use(cors());
app.use(express.json()); //allows us to parse JSON (because our server sends out and receives JSON)

const uri = process.env.ATLAS_URI;
//uri is the connection string;  where our database is stored
mongoose.connect(uri, { useNewUrlParser: true} //this is how we start our connection
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//what starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});