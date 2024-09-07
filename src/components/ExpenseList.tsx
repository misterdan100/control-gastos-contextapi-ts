import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();

  const isEmpty = useMemo(
    () => (state.expenses.length ? false : true),
    [state.expenses]
  );
  return (
    <div className="py-2 bg-white rounded-xl">
      {isEmpty ? (
        <p className="text-2xl font-bold text-center text-gray-300">
          There are not expenses yet!
        </p>
      ) : (
        <>
          <p className="my-3 text-2xl font-medium text-center text-gray-600">
            Expenses List
          </p>
          {state.expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense}/>
          ))}
        </>
      )}
    </div>
  );
}
