import {TaskStateType} from "../App";

type ActionType = RemoveTaskType | SecondActionType

export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}

export type SecondActionType = {
    type: ''
}

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskID)
            return copyState
        case "":
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskType => ({
    type: 'REMOVE-TASK',
    taskID: taskID,
    todoListID: todoListID
})
export const SecondTasksAC = (title: string): SecondActionType => ({type: ''})