import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tasks from './Components/Tasks/Tasks'

class App extends Component {
  constructor(){
    super()

    this.state = {
      tasks: [],
      title:'',
      description:'',
      
    }
    this.addToDo = this.addToDo.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  addToDo(){
    if(this.state.title) {
      let task = {
        title: this.state.title,
        description: this.state.description,
        completed: false
      }
      this.setState({
        tasks: [...this.state.tasks, task]
      })
      this.setState({
        title:'',
        description:'',
      })
    }
  }

  deleteTask(i){
    let deleteArray = this.state.tasks
    deleteArray.splice(i, 1)
    this.setState({
      tasks: deleteArray
    })
  }
  render()  {
    console.log(this.state, 'app state')
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
      deleteTask={this.deleteTask}
      tasks={this.state.tasks}></Tasks>
      </div>
    );
  }
}

export default App;
