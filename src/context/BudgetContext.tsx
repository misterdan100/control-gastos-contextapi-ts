import { useReducer, createContext, ReactNode, useMemo, } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode // to accept any type of html element
}

export const BudgetContext = createContext<BudgetContextProps>(null!) // null! to avoid TS error to expect param




export const BudgetProvider = ({children}: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);
    
    // calculate the budget
    const totalExpenses = useMemo(() => {
        return state.expenses.reduce(
            (total, current) => total + current.amount,
            0
        );
    }, [state.expenses]);

    const remainingBudget = state.budget - totalExpenses

    return (
      <BudgetContext.Provider
        value={{
          state,
          dispatch,
          totalExpenses,
          remainingBudget,
        }}
      >
        {children}
      </BudgetContext.Provider>
    );
}