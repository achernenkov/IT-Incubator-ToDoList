import {FilterValuesType, TodoListType} from "./../App";
import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../api/todolists-api";

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

const initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType):Array<TodoListType> => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST' :
                return [{...action.todolist, filter: "all"},...state]
        case 'CHANGE-TODOLIST-TITLE':
            const task = state.find(task => task.id === action.id)
            if (task) {
                task.title = action.title
                return [...state]
            }
            return state
        case 'CHANGE-TODOLIST-FILTER':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        default:
            return state
    }
}

export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', id: todoListID} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)

export const changeTodolistTitleAC = (todoListID: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    id: todoListID
} as const)

export const changeTodolistFilterAC = (todoListID: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: todoListID,
    filter: filter
} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>)=> ({type: 'GET-TODOLISTS', todolists} as const)



// thunk

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const createTodoListTC = (title:string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title).then(res => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}

export const deleteTodoListTC = (todolistID: string) => (dispatch: Dispatch) =>{
    todolistsAPI.deleteTodolist(todolistID).then(res => {
        dispatch(removeTodoListAC(todolistID))
    })
}

export const changeTodoListTitleTC = (title:string, todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistID, title).then(res => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    })
}