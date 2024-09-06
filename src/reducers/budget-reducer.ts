// Define types of TS
export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'hide-modal'}


export type BudgetState = {
    budget: number
    modal: boolean
}

// Initial State
export const initialState: BudgetState = {
    budget: 0,
    modal: false,
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

    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if(action.type === 'hide-modal') {
        return {
            ...state,
            modal: false
        }
    }

    return state // return state if any action is called
}