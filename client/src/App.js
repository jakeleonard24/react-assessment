import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tasks from './Components/Tasks/Tasks'
import {connect} from 'react-redux';
import {updateTasks} from './ducks/reducer'


class App extends Component {
  constructor(){
    super()

    this.state = {
      id: 2,
      title:'',
      description:'',
      
    }
    this.addToDo = this.addToDo.bind(this)
    
  }

  addToDo(){
    if(this.state.title) {
      let task = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        completed: false
      }

      this.props.updateTasks(task)
      
      this.setState({
        title:'',
        description:'',
        id: this.state.id + 1
      })
    }
  }


  render() 
  
  {
    console.log(this.state, 'app state')
    console.log('app props', this.props.tasks)
    return (
      <div className='appBody'>
        <div className='addTaskBox'>
          <div className='addTaskBoxDiv'>
            <input placeholder='Title' className='taskTitleInput' value={this.state.title} onChange={(e) => {this.setState({title: e.target.value})}}/>
          </div>
          <div className='addTaskBoxDiv'>
            <textarea placeholder='Description' className='taskTextArea' value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
          </div>
          <div>
            <button onClick={this.addToDo} className='addToDoButton'>Add To Do</button>
          </div>
        
        </div>

      <Tasks 
      ></Tasks>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  const { tasks} = state;

  return {
    tasks
  };
}

export default connect( mapStateToProps, { updateTasks } )( App ); 
