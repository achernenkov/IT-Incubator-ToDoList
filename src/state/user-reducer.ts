export type StateType = {
    name: string
    age: number
    childrenCount: number
}

type ActionType = {
    type: string
    [key: string]: any
}

// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
    let newState = {...state}
    switch (action.type) {
        case 'INCREMENT-AGE':
            newState.age = state.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            newState.childrenCount = state.childrenCount + 1;
            return newState;
        case 'CHANGE-NAME':
            newState.name = action.name
            return newState
        default:
            throw new Error("I don't understand this type")
    }
}