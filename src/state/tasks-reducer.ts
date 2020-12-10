import {TaskStateType, TasksType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTaskType | addTaskACType | ChangeTaskStatusACType

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

export type ChangeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDone: boolean
    todoListID: string
}

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskID)
            return copyState
        }
        case "ADD-TASK": {
            let task: TasksType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let copyState = {...state}
            copyState[action.todoListID] = [task, ...copyState[action.todoListID]]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(el => {
                    if (el.id !== action.taskID) return el
                    else return {...el, isDone:action.isDone}
                })
            }
        }
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

export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusACType => ({
    type: "CHANGE-TASK-STATUS",
    taskID,
    isDone,
    todoListID
})