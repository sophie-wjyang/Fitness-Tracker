//we require the router and model that we created
const router = require('express').Router();
let User = require('../models/user.model');

//DISPLAY LIST OF ALL USERS IN DATABASE
//The first endpoint; handles incoming HTTP GET requests on the /users/ URL path
//insomnia: users/ 
router.route('/').get((req, res) => {
    //mongoose method; call this to get a list of all the users from the database
    User.find()
    .then(users => res.json(users)) //if user is found, then return users in JSON format
    .catch(err => res.status(400).json('Error: ' + err)); //if the user is not found
});


//ADD NEW USER
//The second endpoint; handles incoming HTTP POST requests on the /users/add/ URL path
//insomnia: users/add & type information 
router.route('/add').post((req, res) => {
    const username = req.body.username;

    //After getting the username, we create a new instance of User. 
    const newUser = new User({username});

    //The new user is saved to the database with the save() method and we return “User added!”
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;