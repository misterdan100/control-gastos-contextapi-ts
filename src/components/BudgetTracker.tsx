import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <CircularProgressbar 
          value={percentage}
          styles={buildStyles({
            pathColor: (percentage > 69 ? '#EC4899' : '#0284C7' ),
            trailColor: '#f5f5f5',
            textSize: 8,
            textColor: (percentage > 69 ? '#EC4899' : '#0284C7' )
          })}
          text={`${Math.round(percentage)}% spent`}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <button
          type="button"
          className="w-full p-2 font-bold text-white uppercase transition bg-pink-600 border-2 border-pink-600 rounded-2xl hover:bg-pink-500"
          onClick={() => dispatch({type: 'reset-app'})}
        >
          Reset App
        </button>

        <AmountDisplay 
          label='Budget'
          amount={state.budget}
        />

        <AmountDisplay 
          label='Available'
          amount={remainingBudget}
        />

        <AmountDisplay 
          label='Spend'
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}
