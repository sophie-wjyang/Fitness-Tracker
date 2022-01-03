const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//displays ALL exercises in database
//insomnia: exercises/ & set as GET request
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

//CREATE
//insomnia: exercises/add & type information & set as POST request
router.route('/add').post((req, res) => {
    //assign to variables
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    //create new exercise from above variables
    const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//READ (displays one exercise (the id you call))
//insomnia: exercises/id & set as GET request
router.route('/:id').get((req, res) => { //':id' passes the object id
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE
//insomnia: exercises/id & set as DELETE request
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//UPDATE
//insomnia: exercises/update/id & type information & set as POST request
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id) //find the exercise we want to update, then user can enter their changes
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;