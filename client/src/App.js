import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tasks from './Components/Tasks/Tasks'
import {connect} from 'react-redux';
import {addTask} from './ducks/reducer'


class App extends Component {
  constructor(){
    super()

    this.state = {
      
      title:'',
     
      
    }
    this.addTask = this.addTask.bind(this)
    
  }

  addTask(){
    if(this.state.title) {
      let task = {
        
        title: this.state.title,
        
      }
      console.log(task)

      this.props.addTask(task)
      
      this.setState({
        title:'',
        
        
      })
    }
  }


  render() 
  
  {
    // console.log(this.state, 'app state')
    console.log('app props', this.props.tasks)
    return (
      <div className='appBody'>
        <div className='addTaskBox'>
          <div className='addTaskBoxDiv'>
            <input placeholder='Title' className='taskTitleInput' value={this.state.title} onChange={(e) => {this.setState({title: e.target.value})}}/>
          </div>
          
          <div>
            <button onClick={this.addTask} className='addToDoButton'>Add To Do</button>
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

export default connect( mapStateToProps, { addTask } )( App ); 
