// Define types of TS
export type BudgetActions = {
    type: 'add-budget', payload: {budget: number}
}

export type BudgetState = {
    budget: number
}

// Initial State
export const initialState: BudgetState = {
    budget: 0
}

// Define Reducer
export const budgetReducer = (
    state: BudgetState = initialState, // initial state
    action: BudgetActions,             // posibly actions
) => {

    if(action.type === 'add-budget') { // condition per action
        return { // return state copy + modified state item
            ...state,
            budget: action.payload.budget
        }
    }

    return state // return state if any action is called
}