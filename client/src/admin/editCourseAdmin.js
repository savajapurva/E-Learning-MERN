import React, { Component } from 'react';
import axios from 'axios';
import NavBar from "../components/NavBar";

const ShowCat = props => (
    <option key={props.todo.categoryName} value={props.todo.categoryName}>{props.todo.categoryName}</option>
    
            
);
export default class EditCourse extends Component{
    constructor(props) {
        super(props);
        // initialize the state with an empty todos array
        this.state = {todos: [],
            Cat:[]
        }
    }
    componentDidMount() {
       
        axios.get('http://localhost:5000/course?id='+this.props.match.params.id)
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })

        axios.get('http://localhost:5000/categories/')
        .then(response => {
            this.setState({ Cat: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
        }
    
        CatList() {
            return this.state.Cat.map(function(currentTodo, i){
                //  console.log(currentTodo.categoryName)
                return <ShowCat todo={currentTodo} key={i} />;
    
            })
        }

        onChange = (e) => {
            const state = this.state.todos
            state[e.target.name] = e.target.value;
            this.setState({todos:state});
            

          }
        
        //   toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
       
    
        handleChange(e) {
          var whoIsChecked = {...this.state.whoIsChecked}
          whoIsChecked.allowDestroyAll = e.target.value
          this.setState({whoIsChecked}, ()=> {console.log(this.state)})
          
     }
    
        onSubmit = (e) => {
            e.preventDefault();
        
            const { courseName, courseDescription, category, instructor } = this.state.todos;
            console.log(this.state.todos)
            axios.put('http://localhost:5000/course?id='+this.state.todos._id, {courseName, courseDescription, category, instructor})
            .then((result) => {
              this.props.history.push("/ShowCourseList/")
            });
        }
    render(){
         var message='You selected '+this.state.todos._id
        return(
          <div>
            <NavBar />
            <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Edit Course
              </h3>
            </div>
            <div class="panel-body">
             
              {/* <a href={"/showcourses/"} class="btn btn-primary btn active" role="button" aria-pressed="true">Back</a> */}
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="First Name">Course Title:</label>
                  <input type="text" class="form-control" name="courseName" value={this.state.todos.courseName} onChange={this.onChange} placeholder="Course Title" />
                </div>
                <div class="form-group">
                  <label for="Last Name">Course Description:</label>
                  <textarea type="text" class="form-control" name="courseDescription" value={this.state.todos.courseDescription} onChange={this.onChange} placeholder="Description" />
                </div>
                
                            <br />
                
                <button type="submit" class="btn btn-dark">Update</button> &nbsp;
                {/* <button onClick={this.delete.bind(this, this.state.todos._id)} class="btn btn-danger">Delete</button> */}
                {/* <p>{message}</p> */}
              
            
               </form>
            </div>
          </div>
        </div>
        </div>
        )
    }
}