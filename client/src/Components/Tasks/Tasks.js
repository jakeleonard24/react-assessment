import React, { Component } from 'react';
import './Tasks.css'
import {connect} from 'react-redux';
import{ tasks} from '../../ducks/reducer'

class Tasks extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: []
        }
        this.deleteTask = this.deleteTask.bind(this)
    }

    componentDidMount(props){
        this.setState({
            tasks: this.props.tasks
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            tasks: [...this.state.tasks, nextProps.tasks]
        })
    }

    completeTask(index){
        let completedArray = this.state.tasks
        if(completedArray[index].completed === false){
        completedArray[index].completed = true
        this.setState({
            tasks: completedArray
        })
    }
    }

    deleteTask(i){
        let deleteArray = this.state.tasks;
        console.log('delete array', deleteArray)
    
        deleteArray.splice(i, 1)
        this.setState({
            tasks: deleteArray
        })
       
      }

    style1 = {
        backgroundColor: 'green'
    }

    style2 = {
        display: 'none'
    }
    render() {
        console.log(this.state, 'tasks state')

        let tasks = this.state.tasks.map((task, i) => {
            return(
                <div key={i}>
                    <div className='taskBox'>
                        <div className='taskTitleAndDesc'>
                        <p className={task.completed ? 'taskBoxComplete' : 'notComplete'}>Task: {task.title}</p>
                        <p className={task.completed ? 'taskBoxComplete' : 'notComplete'}>Description: {task.description}</p>
                        </div>

                        <div className='taskDeleteandComplete'>
                        <button style={task.completed ? this.style2 : this.style1} onClick={()=>{this.completeTask(i)}}>Complete</button>
                        <button onClick={(i) => {this.deleteTask(i)}}>Delete</button>
                        </div>

                    </div>
                </div>
            )
        })
    
        return (
            <div>
                {tasks}
            </div>
        );
    }
}

function mapStateToProps( state ) {
    const { title, description, tasks } = state;
  
    return {
      title,
      description,
      tasks
    };
  }
  
  export default connect( mapStateToProps)( Tasks ); 