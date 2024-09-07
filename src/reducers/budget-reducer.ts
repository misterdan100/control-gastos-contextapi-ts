import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"


// Define types of TS
export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'hide-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'remove-expense', payload: {id: Expense['id']}} |
    {type: 'get-expense-by-id', payload: {id: Expense['id']}} |
    {type: 'update-expense', payload: {expense: Expense}} | 
    {type: 'reset-app'}


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

// Initial State
export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
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
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if(action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter( exp => exp.id !== action.payload.id)
        }
    }

    if(action.type === 'get-expense-by-id') {

        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map( expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'reset-app') {
        return {
            budget: 0,
            modal: false,
            expenses: [],
            editingId: '',
        }
    }

    return state // return state if any action is called
}