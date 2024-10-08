import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { categories } from "../data/categories";
import { formatDateV2 } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
    const { dispatch } = useBudget()

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
    );

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
            >
                Update
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )
  return (
    <SwipeableList>
        <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >

            <div className="flex items-center w-full gap-5 px-5 py-3 transition border-b border-gray-200 cursor-pointer bg-gray-50 rounded-2xl hover:bg-gray-100">
                <div>
                <img
                    src={`/icono_${categoryInfo.icon}.svg`}
                    alt={categoryInfo.name}
                    className="w-14"
                    />
                </div>

                <div className="flex-1 space-y-1">
                <p className="text-sm font-bold uppercase text-slate-500">
                    {categoryInfo.name}
                </p>
                <p>{expense.expenseName}</p>
                <p className="text-sm text-slate-600">
                    {formatDateV2(expense.date!.toString())}
                </p>
                </div>

                <AmountDisplay amount={expense.amount} />
            </div>
        </SwipeableListItem>
    </SwipeableList>
  );
}
