import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//two components in this file: Exercise and ExercisesList

//Exercise: implemented as a functional react component
//(lacks state and life cycle methods)
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

//ExercisesList: implemented as a class components
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  //get list of exercises from database

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //method for deleting exercises
  deleteExercise(id) {
    //actually deleting from database
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    //deleting from what is displayed to users
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id), //filter what is displayed; only display if an exercise does not have the id we just deleted
    });
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* calls method with exercise list (above) */}
          <tbody>{this.exerciseList()}</tbody> 
        </table>
      </div>
    );
  }
}
