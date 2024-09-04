import { useReducer, createContext, ReactNode, } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode // to accept any type of html element
}

export const BudgetContext = createContext<BudgetContextProps>(null!) // null! to avoid TS error to expect param

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return (
        <BudgetContext.Provider 
            value={{state, dispatch}}
        >
            {children}
        </BudgetContext.Provider>

    )
}