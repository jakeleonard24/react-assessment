import axios from 'axios';

const initialState = {
    tasks: [],
    
}


const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_TASKS = 'UPDATE_TASKS';
const DELETE_TASK = 'DELETE_TASK';


function reducer(state= initialState, action){
    switch (action.type) {
        

        case UPDATE_TASKS:
        return Object.assign({}, state, {...state, tasks: action.payload})

        case DELETE_TASK:
        return Object.assign({}, state, {tasks: action.payload});

        default:
            return state;
    }

}



  export function updateTasks( task ) {
      return{
          type: UPDATE_TASKS,
          payload: task
      }
  }

  export function deleteTask( index ) {
    return{
        type: DELETE_TASK,
        payload: index
    }
}

  export default reducer;