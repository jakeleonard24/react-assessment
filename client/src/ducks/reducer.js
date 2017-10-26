import axios from 'axios';

const initialState = {
    tasks: [],
    
}


const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const COMPLETE_TASK = "COMPLETE_TASK";
const DELETE_TASK = "DELETE_TASK";

function reducer(state = initialState, action){
    switch (action.type) {
        case GET_TASKS + "_FULFILLED":
            return Object.assign({}, state, {tasks: action.payload})
        case DELETE_TASK + "_FULFILLED":
            return Object.assign({}, state, {tasks: action.payload})
        case ADD_TASK + "_FULFILLED":
            return Object.assign({}, state, {tasks: action.payload})
        case COMPLETE_TASK + "_FULFILLED":
            return Object.assign({}, state, {tasks: action.payload})
        case UPDATE_TASK + "_FULFILLED":
            return Object.assign({}, state, {tasks: action.payload})
        
        default:
            return state;
    }
}


export function getTasks(){
    const allTasks = axios.get('https://practiceapi.devmountain.com/api/tasks')
    .then(response => {
        return response.data
    })   
    return {
        type: GET_TASKS,
        payload: allTasks
    } 
};

export function addTask(task){
    const addTask = axios.post('https://practiceapi.devmountain.com/api/tasks',
     {
        completed: task.completed,
      description: task.description,
      id: task.id,
      title: task.title, 
      
     
        })
    .then( response => {
        return response.data
    })
    return {
        type: ADD_TASK,
        payload: addTask
    }
}

export function updateTask(id, title, des){
    const request = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`,{
        "title": `${title}`,
        "description": `${des}`,
    })
    .then( response => {
        return response.data
    })
    return {
        type: UPDATE_TASK,
        payload: request
    }
}

export function deleteTask(id){
    const delTask = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then(response => {
        return response.data
    })
    return {
        type: DELETE_TASK,
        payload: delTask
    }

}

export function completeTask(id){
    const complete = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then(response => {
        return response.data
    })
    return {
        type: COMPLETE_TASK,
        payload: complete
    }
}




export default reducer;


  