import React, { Component } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowUser = props => (
  <option selected="selected" key={props.todo.email} value={props.todo.email}>
    {props.todo.email}
  </option>
);

const ShowCourse = props => (
  <option key={props.todo.courseName} value={props.todo.courseName}>
    {props.todo.courseName}
  </option>
);
export default class CreateEnroll extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      User: [],
      Course: []
    };

    /** Ensure to bind our methods to this by adding them here **/

    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/courses/")
      .then(response => {
        this.setState({ Course: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then(response => {
        this.setState({ User: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  CourseList() {
    return this.state.Course.map(function(currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowCourse todo={currentTodo} key={i} />;
    });
  }

  UserList() {
    return this.state.User.map(function(currentTodo, i) {
      //  console.log(currentTodo.categoryName)
      return <ShowUser todo={currentTodo} key={i} />;
    });
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    });
  }

  onChangeStudent(e) {
    this.setState({
      student: e.target.value
    });
  }

  /** Method to handle the submit event of the form **/
  onSubmit(e) {
    e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

    console.log(`Form submitted:`);

    console.log(`Todo course: ${this.state.course}`);
    console.log(`Todo student: ${this.state.student}`);

    const newTodo = {
      student: this.state.student,
      course: this.state.course,
      todo_completed: this.state.todo_completed
    };

    axios.post("http://localhost:5000/enroll/add/", newTodo).then(result => {
      this.props.history.push("/EnrollmentList/");
    });

    // Reset the Values.
    this.setState({
      student: "",
      course: "",
      todo_completed: false
    });
  }

  // JSX code which is needed to display the form
  render() {
    var message = "You selected " + this.state.course;
    var message2 = "you have selected " + this.state.student;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                {/* <Link to="/" className="btn btn-light">Go Back</Link>
                            <br/>
                            <br/> */}
                <h1
                  className="h3 mb-3 font-weight-bold"
                  style={{ textDecoration: "underline" }}
                >
                  Create New User
                </h1>
                <br />

                <div>
                  <label>Student id: </label>
                  <br />

                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid lightgray",
                      borderRadius: "5px"
                    }}
                    name="student"
                    id="ada"
                    onChange={this.onChangeStudent}
                    value={this.state.student}
                  >
                    {this.UserList()}
                    {/* <option value="Mobile Development">Android Development</option> */}
                  </select>
                </div>

                <div>
                  <br />

                  <label>Course: </label>
                  <br />

                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid lightgray",
                      borderRadius: "5px"
                    }}
                    name="course"
                    id="ada2"
                    onChange={this.onChangeCourse}
                    value={this.state.course}
                    defaultValue={this.state.course}
                  >
                    {this.CourseList()}
                  </select>
                </div>

                <br />
                <button
                  type="submit"
                  value="Add User"
                  className="btn btn-lg btn-info btn-block"
                >
                  Add Enrollment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
