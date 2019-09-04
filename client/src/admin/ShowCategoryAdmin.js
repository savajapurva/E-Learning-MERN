import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/NavBar";

export default class ShowCategory extends Component {
  constructor(props) {
    super(props);

    /** Setting the initial state of the component by assigned an object to this.state **/
    this.state = {
      todos: [],
      search: ""
    };
  }

  //for searching event in page
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    //to get data from mongo link
    axios
      .get("http://localhost:5000/categories/")
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
      .delete("http://localhost:5000/category?id=" + id)
      .then(result => {
        // this.forceUpdate()
        // this.props.history.push("/showcategory/")
        toast.success("Deleted successfully");
      })
      .catch(err => {
        // then print response status
        toast.error("Category not deleted");
      });
    setTimeout(
      function() {
        //Start the timer
        window.location.reload(); //After 1 second, set render to true
      }.bind(this),
      1300
    );
  }

  render() {
    const divStyle = {
      display: "contents"
    };
    // var message='You selected '+this.state.whoIsChecked.allowDestroyAll
    const Todo = props => (
      <div style={divStyle}>
        <tr>
          <td>{props.todo.categoryName}</td>

          <td>
            <a
              href={"/ShowCategoryList/edit/" + props.todo._id}
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
    let filteredusers = this.state.todos.filter(category => {
      return category.categoryName.indexOf(this.state.search) !== -1;
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
          <a
            href="/CreateCategoryAdmin/"
            className="btn btn-primary btn-info btn active"
            role="button"
            aria-pressed="true"
          >
            Create Category
          </a>{" "}
          <br />
          <h1
            style={{
              marginLeft: "-200px",
              textDecoration: "underline",
              color: "#F0542D"
            }}
          >
            Category List
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
