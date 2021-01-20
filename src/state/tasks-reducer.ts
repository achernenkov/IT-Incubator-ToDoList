import {TaskStateType, TasksType} from "./../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";

type ActionType = RemoveTaskType
    | addTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType

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

export type ChangeTaskTitleACType = {
    type: "CHANGE-TASK-TITLE",
    taskID: string,
    taskTitle: string
    todoListID: string
}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "GET-TODOLISTS":{
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
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
                    else return {...el, isDone: action.isDone}
                })
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(el => {
                    if (el.id !== action.taskID) return el
                    else return {...el, title: action.taskTitle}
                })
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "ADD-TODOLIST": {
            let id = action.todolistID
            let copyState = {...state, [id]: []}
            return copyState
        }
        default:
            return state
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

export const ChangeTaskTitleAC = (taskID: string, taskTitle: string, todoListID: string): ChangeTaskTitleACType => ({
    type: "CHANGE-TASK-TITLE",
    taskID,
    taskTitle,
    todoListID
})