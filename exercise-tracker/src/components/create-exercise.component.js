import React, { Component } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreateExercises extends Component {
  constructor(props) {
    super(props);

    //binding "this" to each of these methods, so it refers to the correct thing
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //INITIALIZING VALUES FOR VARIABLES (before user enters anything)
    //state is how we create variables in react
    //updating state will automatically update your page with the new values
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [], //array so we can have a dropdown menu where you can select from a list of existing users
    };
  }

  //this is a react life cycle method (automatically called at different points)
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) { //at least one user in database
          this.setState({
            users: response.data.map(user => user.username), //returns username field of an element in array of users 
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //UPDATING VALUE OF VARIABLES (after user types something in the text boxes)
  onChangeUsername(e) {
    this.setState({
      username: e.target.value, //sets the value of username to what is entered in the text box
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault(); //instead of acting on the default settings, the following will happen:

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = "/"; //takes user back to home page (exercises list) after submission
  }

  render() {
    return (
      //HTML code for the form users submit
      <div>
        <h3>Create New Exercise Log</h3>
        {/* when you submit, calls this.onSubmit */}
        <form onSubmit={this.onSubmit}> 
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                //map allows us to return something for each element in the array
                this.state.users.map(function (user) {
                    return (
                    <option key={user} value={user}>
                        {user}
                    </option>
                    );
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date} //initial selection
                onChange={this.onChangeDate} //after you change that selection
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
