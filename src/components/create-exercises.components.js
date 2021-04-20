import React, { Component, createRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class CreateExercises extends Component {
     constructor(props){
       super(props);


       this.state = {
         username : "",
         description : "",
         duration : 0,
         date : new Date(),
         users : []
       }
       this.users = createRef();

       this.onChangeUserName = this.onChangeUserName.bind(this);
       this.onChangeDescription = this.onChangeDescription.bind(this);
       this.onChangeDuration = this.onChangeDuration.bind(this);
       this.onChangeDate = this.onChangeDate.bind(this);
       this.onSubmitHandler = this.onSubmitHandler.bind(this);

     }

     componentDidMount() {


      axios.get('http://localhost:4000/users/').then(res => {
          if(res.data.length > 0){
            this.setState({
              users : res.data.map(user => user.username),
              username: res.data[0].username
            })
          }
      })
     }
    


    onChangeUserName(e){
      this.setState({
        username : e.target.value
      })
    }
    onChangeDescription(e){
      this.setState({
        description : e.target.value
      })
    }

    onChangeDuration(e){
      this.setState({
        duration : e.target.value
      })
    }

    onChangeDate(date){
      this.setState({
        date : date
      })
    }

    onSubmitHandler(e){
      e.preventDefault();


      const exercise = {
        username : this.state.username,
        description : this.state.description,
        duration : this.state.duration,
        date : this.state.date
      }
      console.log(exercise)
      axios.post('http://localhost:4000/exercise/add', exercise).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
      
      window.location = '/'
      
    }

    render() {
      
        return (
           <div>
              <h3>Create New Exercise Log</h3>
              <form onSubmit={this.onSubmitHandler}>
                  <div className="form-group">
                     <label>User Name : </label>
                     <select ref={this.users} required
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUserName}
                     >
                     {this.state.users.map(user => {
                       return (
                           <option key={user} value={user}>{user}</option>
                       );
                     })}
                     </select>
                  </div>
                  <div className="form-group">
                     <label>Description</label>
                     <input
                      className="form-control"
                      type="text"
                      required
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      placeholder="Add Description"
                     />
                  </div>
                  <div className="form-group">
                  <label>Duration (in minutes)</label>
                  <input
                   type="number"
                   required
                   value={this.state.duration}
                   onChange={this.onChangeDuration}
                   placeholder="Add Duration"
                  />
               </div>
               <div className="form-group">
                  <label>Date : </label>
                   <div>
                      <DatePicker 
                       selected={this.state.date}
                       onChange={this.onChangeDate}
                      />
                   </div>
               </div>
               <div className="form-group">
                 <input type="submit" value="Create Exercise Log" className="btn btn-success"/>
               </div>
              </form>
           </div>
        );
    }
}