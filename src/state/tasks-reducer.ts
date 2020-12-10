import {TaskStateType, TasksType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTaskType | addTaskACType

export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}

export type addTaskACType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskID)
            return copyState }
        case "ADD-TASK": {
            let task: TasksType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let copyState = {...state}
            copyState[action.todoListID] = [task,...copyState[action.todoListID]]
            return copyState }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskType => ({
    type: 'REMOVE-TASK',
    taskID: taskID,
    todoListID: todoListID
})
export const addTaskAC = (title: string, todoListID: string): addTaskACType => ({type: 'ADD-TASK', title, todoListID})