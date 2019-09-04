import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

export default class CatEdit extends Component {
  constructor(props) {
    super(props);
    // initialize the state with an empty todos array
    this.state = { todos: [] };
  }

  // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
  componentDidMount() {
    axios
      .get("http://localhost:5000/category?id=" + this.props.match.params.id)
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChange = e => {
    const state = this.state.todos;
    state[e.target.name] = e.target.value;
    this.setState({ todos: state });
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  handleChange(e) {
    var whoIsChecked = { ...this.state.whoIsChecked };
    whoIsChecked.allowDestroyAll = e.target.value;
    this.setState({ whoIsChecked }, () => {
      console.log(this.state);
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { no, categoryName } = this.state.todos;
    console.log(this.state.todos);
    axios
      .put("http://localhost:5000/category?id=" + this.props.match.params.id, {
        no,
        categoryName
      })
      .then(result => {
        this.props.history.push("/ShowCategoryList/");
      });
  };

  render() {
    // const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    var message = "You selected " + this.state.todos.role;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit}>
                {/* <Link to="/" className="btn btn-light">
                  Go Back
                </Link> */}
                <br />
                <br />
                <h1
                  className="h3 mb-3 font-weight-bold"
                  style={{ textDecoration: "underline" }}
                >
                  EDIT Category
                </h1>
                <br />

                <div>
                  <label>Category Name: </label>
                  <br />

                  <input
                    type="text"
                    class="form-control"
                    name="categoryName"
                    value={this.state.todos.categoryName}
                    onChange={this.onChange}
                    placeholder="categoryName"
                  />
                </div>

                <br />
                <button
                  type="submit"
                  className="btn btn-lg btn-info btn-block"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
