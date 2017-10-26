import React, { Component } from 'react';
import './Tasks.css'
import {connect} from 'react-redux';
import{ getTasks, updateTask, completeTask, deleteTask} from '../../ducks/reducer';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Tasks extends Component {
    constructor(props){
        super(props)

        this.state = {
            modalIsOpen: false,
            selectedId: 0,
            selectedIndex: 0,
            selectedTitle: '',
            selectedDescription: ''
        }
        
        this.deleteTask = this.deleteTask.bind(this)
        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount(props){
        this.props.getTasks()
    }
    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         tasks: [...this.state.tasks, nextProps.tasks]
    //     })
    // }

    completeTask(id){
        this.props.completeTask(id)
        
    }
    

    deleteTask(id){
        this.props.deleteTask(id)

        
      }

      
      openModal(id, i, title, description) {
        
            this.setState({modalIsOpen: true,
                            selectedId: id,
                            selectedIndex: i,
                            selectedTitle: title,
                            selectedDescription: description
                              });
        
      }

      afterOpenModal() {
        
        this.subtitle.style.color = '#5BC3EB';
      }

      closeModal() {
        this.setState({modalIsOpen: false});
      }

    style1 = {
        backgroundColor: 'green'
    }

    style2 = {
        display: 'none'
    }
    render() {
        console.log('modal state', this.state.modalIsOpen)
        console.log('selectedID', this.state.selectedId)
        console.log('selectedTitle', this.state.selectedTitle)
        console.log('selectedDescription', this.state.selectedDescription)

        let tasks = this.props.tasks.map((task, i) => {
            return(
                <div key={i}>
                    <div className='taskBox'>
                        <div onClick={() => {this.openModal(task.id, i, task.title, task.description)}} className='taskTitleAndDesc'>
                        <p className={task.completed ? 'taskBoxComplete' : 'notComplete'}>Task: {task.title}</p>
                        <p className={task.completed ? 'taskBoxComplete' : 'notComplete'}>Description: {task.description}</p>

                        
                        </div>

                        <div className='taskDeleteandComplete'>
                        <button style={task.completed ? this.style2 : this.style1} onClick={()=>{this.completeTask(task.id)}}>Complete</button>
                        <button onClick={(i) => {this.deleteTask(task.id)}}>Delete</button>
                        </div>

                    </div>
                </div>
            )
        })
    
        return (
            <div>
                {tasks}
            
                <Modal   isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">

                    <div className='modal'>
                     <h2 ref={subtitle => this.subtitle = subtitle}>Edit Task</h2>
                        <p>Title: {this.state.selectedTitle}</p> <input onChange={(e) => {this.setState({
                            selectedTitle: e.target.value
                        })}}  placeholder='change the title' />
                        <p>Description: {this.state.selectedDescription}</p>
                        <textarea onChange={(e) => {this.setState({
                            selectedDescription: e.target.value
                        })}} placeholder='add or change description' className='taskTextArea'></textarea>

                        <button onClick={() => {this.props.updateTask(this.state.selectedId, this.state.selectedTitle, this.state.selectedDescription); this.closeModal() }}>Save</button>

                        <button onClick={() => {this.openModal(this.props.tasks[this.state.selectedIndex].id, this.props.tasks[this.state.selectedIndex], this.props.tasks[this.state.selectedIndex].title, this.props.tasks[this.state.selectedIndex].description); this.closeModal()}}>cancel</button>

                        <button onClick={() => {this.deleteTask(this.state.selectedId); this.closeModal()}} >delete</button>

                        <button onClick={()=>{this.completeTask(this.state.selectedId); this.closeModal()}}>complete</button>
                    </div>

                    </Modal>
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
  
  export default connect( mapStateToProps, {getTasks, updateTask, completeTask, deleteTask})( Tasks ); 