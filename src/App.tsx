import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"

function App() {
  const { state } = useBudget()

  const isValidBudget = useMemo(() => {
    return state.budget > 0
  }, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="flex items-center justify-center gap-4 py-8 bg-sky-600 max-h-72">
        <img src="/public/wallet-icon.svg" className="h-[50px] hover:scale-110 hover:rotate-[360deg] transition" />
        <h1 className="text-4xl italic font-black text-center text-white uppercase ">
          Expenses Planner
        </h1>
      </header>

      <div className="max-w-3xl p-10 mx-auto mt-10 bg-white rounded-lg shadow-lg">
        {isValidBudget ? <BudgetTracker />  : (
          <BudgetForm />
        )}

      </div>

        {isValidBudget && (
          <main  className="max-w-3xl py-10 mx-auto">
            <ExpenseList />
            <ExpenseModal/>
          </main>
        )}
    </>
  )
}

export default App
