import React, { Component } from 'react';
import axios from 'axios'


export default class CreateUser extends Component {
  constructor(props){
    super(props);


    this.state = {
      name: "",
      username : "",
    
    }
    

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this);

  }

  onChangeName(e){
    this.setState({
      name : e.target.value
    })
  }
  
  onChangeUsername(e){
    this.setState({
      username : e.target.value
    })
  }



  onSubmitHandler(e){
    e.preventDefault();


    const user = {
       name : this.state.name,
       username : this.state.username,

    }
   
      axios.post('http://localhost:4000/users/register', user)
      .then(response => response.json()).then(data => {
        console.log(data)
      }).catch(error => console.log) 

    console.log(user)

    this.setState({
      name: "",
      username : "",
    })
    
  }
    render() {
        return (
          <div>
          <h3>Create User Account</h3>
          <form onSubmit={this.onSubmitHandler}>
              <div className="form-group">
                 <label>Name : </label>
                 <input
                 className="form-control"
                 type="text"
                 required
                 value={this.state.name}
                 onChange={this.onChangeName}
                 placeholder="Name"
                />
              </div>
              <div className="form-group">
              <label>UserName</label>
              <input
               className="form-control"
               type="text"
               required
               value={this.state.username}
               onChange={this.onChangeUsername}
               placeholder="User Name"
              />
           </div>
           <div className="form-group">
             <input type="submit" value="Create User" className="btn btn-warning"/>
           </div>
          </form>
       </div>
        );
    }
}