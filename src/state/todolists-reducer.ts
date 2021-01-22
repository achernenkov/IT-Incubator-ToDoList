import {FilterValuesType, TodoListType} from "./../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../api/todolists-api";

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType;
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

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

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todoListID
})
export const AddTodolistAC = (todolist: TodolistType): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    todolist
})
export const ChangeTodolistTitleAC = (todoListID: string, title: string): ChangeTodolistTitleActionType => ({
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    id: todoListID
})
export const ChangeTodolistFilterAC = (todoListID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: todoListID,
    filter: filter
})

export const setTodolistsAC = (todolists: Array<TodolistType>)=> {
    return ({type: 'GET-TODOLISTS', todolists} as const)
}



// thunk

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const createTodoListTC = (title:string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title).then(res => {
        dispatch(AddTodolistAC(res.data.data.item))
    })
}

export const deleteTodoListTC = (todolistID: string) => (dispatch: Dispatch) =>{
    todolistsAPI.deleteTodolist(todolistID).then(res => {
        dispatch(RemoveTodoListAC(todolistID))
    })
}

export const changeTodoListTitleTC = (title:string, todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistID, title).then(res => {
        dispatch(ChangeTodolistTitleAC(todolistID, title))
    })
}