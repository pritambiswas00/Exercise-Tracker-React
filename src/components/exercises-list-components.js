import axios from 'axios';
import React, { Component } from 'react';
import Exercise from './Exercise.component'

export default class ExercisesList extends Component {

  constructor(props){
    super(props);
   
    this.state ={
      exercise : []
    }

    this.deleteExercise = this.deleteExercise.bind(this);



  }

  componentDidMount(){
    axios.get('http://localhost:4000/exercise/').then(res =>{
      this.setState({
        exercise : res.data
      })
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
  }

  deleteExercise(id){

    axios.delete('http://localhost:4000/exercise/'+id).then(res =>{
       console.log(res.data)
       this.setState({
         exercise : this.state.exercise.filter(el => el._id !== id)
       })
    })
    console.log('deleting exercises')
  }



    render() {
        return (
           <div>
               
           <h3>Exercises List</h3>
             <table className="table">
                <thead className="thead-light">
                   <tr>
                     <th>UserName</th>
                      <th>Description</th>
                      <th>Duration</th>
                      <th>Date</th>
                      <th>Actions</th>
                   </tr>
                </thead>
                  <tbody>
                    {this.state.exercise.map(exercise => {
                      return <Exercise exercise={exercise} delete={this.deleteExercise} key={exercise._id}/>
                    })}
                  </tbody>
             </table>
           </div>
        );
    }
}
