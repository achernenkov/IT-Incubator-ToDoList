import {TaskStateType} from "../App";

type ActionType = FirstActionType | SecondActionType

export type FirstActionType = {
    type: ''
}

export type SecondActionType = {
    type: ''
}

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "":
            return state
        case "":
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const FirstTasksAC = (todoListID: string): FirstActionType => ({type:''})
export const SecondTasksAC = (title:string):SecondActionType => ({type:''})