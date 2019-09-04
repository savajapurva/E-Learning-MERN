import React, { Component} from 'react';
// import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import axios from 'axios';
import "./admin.css";

const divStyle =  {
    display:"contents"
}


const Todo = props => (

    
    <div style={divStyle} >
    
    <tr>
        <td>{props.todo.first_name}</td>
        <td>{props.todo.last_name}</td>
        <td>{props.todo.email}</td>
        <td>{props.todo.role}</td>
        <td>
            {/* <Link to={"users/edit/"+props.todo._id}>Edit</Link> */}
            {/* <button className="button muted-button" className="btn btn-success"><Link to={"users/edit/"+props.todo._id}>Edit</Link></button> */}
            <a href={"/allusers/edit/"+props.todo._id} className="btn btn-primary btn-info" role="button" aria-pressed="true">Edit</a>
            
        </td>
    </tr>
    </div>
);


export default class UserList extends Component {
    constructor(props) {
        super(props);
        // initialize the state with an empty todos array
        this.state = {todos: [],
                    search:''    
        };
        
    }

    //for searching event in page
    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)});
    }

    // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
    componentDidMount() {
        //to get data from mongo link
        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
            
        
       
    }
    

    // todoList() {
    //     return this.state.todos.map(function(currentTodo, i){
    //         // console.log(currentTodo.first_name)
    //         return <Todo todo={currentTodo} key={i} />;

    //     })
    // }

    render() {
        //used in filtering the content coming from database mongo
        let filteredusers=this.state.todos.filter(
            (user)=>{
                return (user.first_name.indexOf(this.state.search)!==-1||
                        user.last_name.indexOf(this.state.search)!==-1||
                        user.email.indexOf(this.state.search)!==-1);
            }
        );
        return (
           
            <div>
                <NavBar/>           
               
               <div style={{padding:"20px",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
               <a href="/users/create" className="btn btn-primary btn-info btn active" role="button" aria-pressed="true">Create User</a> <br/>
               
                <h1 style={{marginLeft:"-200px", textDecoration:"underline", color:"#F0542D"}}>Manage Users</h1>
                <input type="text" placeholder="Search..." class="form-control input-sm" style={{width:"250px"}} value={this.state.search} onChange={this.updateSearch.bind(this)}/>
               </div>
      
               <div className="container" style={{ border: "10px solid lightgray"}}>
               <table className="table table-striped" id="usertable"  ref={el=>this.el=el} data-order='[[ 1, "asc" ]]' data-page-length='25'>
                     <thead>
                         <tr>
                             <th>First Name</th>
                             <th>Last Name</th>
                             <th>Email</th>
                             <th>Role</th>
                           
                             <th>Action</th>
                         </tr>
                     </thead>
                     <tbody>
                       
                         {/* displaying data coming  */}
                     {filteredusers.map(function(currentTodo, i){
           
                    return <Todo todo={currentTodo} key={i} />;})}
                     </tbody>
                 </table>
                 
               </div>
 
            </div>
        )
    }
}