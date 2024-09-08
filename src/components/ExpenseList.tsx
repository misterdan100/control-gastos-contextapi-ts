import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();

  const isEmpty = useMemo(
    () => (state.expenses.length ? false : true),
    [state.expenses]
  );

  const filteredExpense = state.currentCategory ? state.expenses.filter( current => current.category === state.currentCategory) : state.expenses
  return (
    <div className="flex flex-col gap-4 p-2 mt-5 bg-white rounded-lg shadow-lg">
      {isEmpty ? (
        <p className="text-2xl font-bold text-center text-gray-300">
          There are not expenses yet!
        </p>
      ) : (
        <>
          <p className="my-3 text-2xl font-medium text-center text-gray-600">
            Expenses List
          </p>
          {filteredExpense.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense}/>
          ))}
        </>
      )}
    </div>
  );
}
