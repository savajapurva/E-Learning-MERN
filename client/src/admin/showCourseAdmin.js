import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    // initialize the state with an empty todos array
    this.state = { todos: [], search: "" };
  }

  //for searching event in page
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
  componentDidMount() {
    //to get data from mongo link
    axios
      .get("http://localhost:5000/courses/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  delete(id) {
    console.log(id);
    axios
      .delete("http://localhost:5000/course?id=" + id)
      .then(result => {
        // this.forceUpdate()
        // this.props.history.push("/showcourses/")
        toast.success("Deleted successfully");
      })
      .catch(err => {
        // then print response status
        toast.error("Course not deleted");
      });
    setTimeout(
      function() {
        //Start the timer
        window.location.reload(); //After 1 second, set render to true
      }.bind(this),
      1300
    );
  }

  // todoList() {
  //     return this.state.todos.map(function(currentTodo, i){
  //         // console.log(currentTodo.first_name)
  //         return <Todo todo={currentTodo} key={i} />;

  //     })
  // }

  render() {
    const divStyle = {
      display: "contents"
    };
    // var message='You selected '+this.state.todos._id
    const Todo = props => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.courseName}</td>
          <td>{props.todo.courseDescription}</td>
          <td>{props.todo.instructor.email}</td>
          <td>{props.todo.category.categoryName}</td>
          <td>
            {/* <Link to={"users/edit/"+props.todo._id}>Edit</Link> */}
            {/* <button className="button muted-button" class="btn btn-success"><Link to={"users/edit/"+props.todo._id}>Edit</Link></button> */}
            <a
              href={"/ShowCourseList/edit/" + props.todo._id}
              class="btn btn-primary btn-info"
              role="button"
              aria-pressed="true"
            >
              Edit
            </a>
            {/* <button onClick={this.delete.bind(this, props.todo._id)} class="btn btn-danger">Delete</button> */}
            {/* <p>{message}</p> */}
          </td>
        </tr>
      </div>
    );
    //used in filtering the content coming from database mongo
    let filteredusers = this.state.todos.filter(course => {
      return (
        course.courseName.indexOf(this.state.search) !== -1 ||
        course.courseDescription.indexOf(this.state.search) !== -1 ||
        course.category.categoryName.indexOf(this.state.search) !== -1 ||
        course.instructor.email.indexOf(this.state.search) !== -1
      );
    });
    return (
      <div>
        <NavBar />

        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <input type="hidden" />
          <h1
            style={{
              marginLeft: "-200px",
              textDecoration: "underline",
              color: "#F0542D"
            }}
          >
            Course List
          </h1>
          <input
            type="text"
            placeholder="Search..."
            class="form-control input-sm"
            style={{ width: "250px" }}
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>

        <div className="container" style={{ border: "10px solid lightgray" }}>
          <table
            className="table table-striped"
            id="usertable"
            style={{ marginTop: 20 }}
            ref={el => (this.el = el)}
            data-order='[[ 1, "asc" ]]'
            data-page-length="25"
          >
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Course Description</th>
                <th>Instructor</th>
                <th>Category</th>

                <th>Action</th>
              </tr>
            </thead>
            <ToastContainer />
            <tbody>
              {/* displaying data coming  */}
              {filteredusers.map(function(currentTodo, i) {
                return <Todo todo={currentTodo} key={i} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
