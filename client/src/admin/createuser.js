import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';

const ShowRole = props => (
    <option key={props.todo.name} value={props.todo.name}>{props.todo.name}</option>
    
            
  );

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        /** Setting the initial state of the component by assigned an object to this.state **/
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role:'admin',
            Roles:[]
        };

        /** Ensure to bind our methods to this by adding them here **/
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole=this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
       
        

            axios.get('http://localhost:5000/showroles/')
            .then(response => {
                this.setState({ Roles: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
        
    }

    RoleList() {
        return this.state.Roles.map(function(currentTodo, i){
            //  console.log(currentTodo.categoryName)
            return <ShowRole todo={currentTodo} key={i} />;
  
        })
    }
    /** Methods which can be used to update the state properties **/
    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    /** Method to handle the submit event of the form **/
    onSubmit(e) {
        e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

        console.log(`Form submitted:`);
        console.log(`Todo name: ${this.state.first_name}`);
        console.log(`Todo lname: ${this.state.last_name}`);
        console.log(`Todo email: ${this.state.email}`);
        console.log(`Todo password: ${this.state.password}`);
        console.log(`Todo Role: ${this.state.role}`);

        const newTodo = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:5000/user/', newTodo)
        .then((result) => {
            this.props.history.push("/allusers/")
          });

        // Reset the Values.
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            password:'',
            role:'admin',
            todo_completed: false
        })
    }

    // JSX code which is needed to display the form
    render() {
        var message='You selected '+this.state.role
        return (
            <div>
                <NavBar />
            
        <div className="container">
    <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={this.onSubmit} >
                {/* <Link to="/" className="btn btn-light">Go Back</Link>
                <br/>
                <br/> */}
                <h1 className="h3 mb-3 font-weight-bold" style={{textDecoration:"underline"}}>Create New User</h1>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text"
                        className="form-control"
                        value={this.state.first_name}
                        onChange={this.onChangeFirstName}
                        />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text"
                        className="form-control"
                        value={this.state.last_name}
                        onChange={this.onChangeLastName}
                        />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="text"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="text"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                </div>

                <div>
                               

                            <label>Role: </label>
                            <br/>
                    
                            <select 
                            style={{width:"100%",padding:"10px", border:"1px solid lightgray", borderRadius:"5px"}}
                            name="role"
                            id="ada"
                            onChange={this.onChangeRole}
                            value={this.state.role} 
                            >
                            {this.RoleList()}
                                {/* <option value="Mobile Development">Android Development</option> */}
                                
                            </select>                     
                            
                            </div>
                
                <br/>

                <input type="submit" value="Add User" className="btn btn-lg btn-info btn-info btn-block" />
            </form>
        </div>
    </div>
    </div>
</div>
        
        )
    }
}