import {TaskStateType} from "./../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type ActionType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export type AddTaskACType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export type SetTasksActionType = ReturnType<typeof setTasksAC>

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "SET-TASKS":{
            const stateCopy = {...state}
            stateCopy[action.todolistID] = action.tasks
            return stateCopy
        }
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
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(el => {
                    if (el.id !== action.taskID) return el
                    else return {...el, status: action.status}
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
            let id = action.todolist.id
            let copyState = {...state, [id]: []}
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListID: string) => ({
    type: 'REMOVE-TASK',
    taskID: taskID,
    todoListID: todoListID
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string) => ({
    type: "CHANGE-TASK-STATUS",
    taskID,
    status,
    todoListID
} as const)

export const changeTaskTitleAC = (taskID: string, taskTitle: string, todoListID: string) => ({
    type: "CHANGE-TASK-TITLE",
    taskID,
    taskTitle,
    todoListID
} as const)

const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({type: 'SET-TASKS', tasks, todolistID} as const)


//thunk

export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistID).then(res => {
        dispatch(setTasksAC(res.data.items, todolistID))
    })
}

export const removeTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistID, taskID).then(res => {
        dispatch(removeTaskAC(taskID, todolistID))
    })
}

export const addTaskTS = (todolistid: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistid, title).then(res => {
        dispatch(addTaskAC(res.data.data.item))
    })
}

export const renameTaskTS = (todolistid: string, taskid:string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistid]
    const task = tasksForCurrentTodolist.find(t => t.id === taskid)

    if(task){
        todolistsAPI.updateTask(todolistid, taskid, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        }).then(res => {
            dispatch(changeTaskTitleAC(taskid,title,todolistid))
        })
    }
}

export const changeTaskStatusTS = (todolistid: string, taskid:string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistid]
    const task = tasksForCurrentTodolist.find(t => t.id === taskid)

    if(task){
        todolistsAPI.updateTask(todolistid, taskid, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }).then(res => {
            dispatch(changeTaskStatusAC(taskid,status,todolistid))
        })
    }
}