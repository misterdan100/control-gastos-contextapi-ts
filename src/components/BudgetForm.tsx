import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {
    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'add-budget', payload: {budget: budget}})
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-sky-600 font-bold text-center">
                Define Budget
            </label>
            <input 
                id="budget"
                type="number" 
                className="w-full bg-white border border-sky-200 p-2 text-center rounded-2xl"
                placeholder="Enter your budget"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            value='Define Budget'
            className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-2xl disabled:opacity-40"
            disabled={isValid}
        />
    </form>
  )
}
