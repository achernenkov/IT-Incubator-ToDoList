import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
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

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    let newState = {...state}
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST' :
            const newTodoListID: string = action.todolistID
            const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: "all"}
            return [...state, newTodoList]
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
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todoListID
})
export const AddTodolistAC = (title: string): AddTodolistActionType => ({
    type: "ADD-TODOLIST",
    title: title,
    todolistID: v1()
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
