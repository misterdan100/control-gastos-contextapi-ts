import { useState, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error, setError ] = useState('')
    const { dispatch } = useBudget()

    const handleChange = (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      const isAmountField = ["amount"].includes(name);

      setExpense({
        ...expense,
        [name]: isAmountField ? +value : value,
      });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense, 
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // Validate
        if(Object.values(expense).includes('')) {
            setError('All inputs are required!')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        } 

        // Add new Expense
        dispatch({type: 'add-expense', payload: {expense}})
        
    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="py-2 text-2xl font-bold text-center uppercase border-b-2 border-sky-500"
        >
            New Expense
        </legend>

        
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-lg"
            >
                Expense Name: 
            </label>
            <input 
                type="text"
                className="px-4 py-2 border border-transparent bg-slate-100 rounded-2xl focus:outline-none focus:border-sky-500"
                id="expenseName"
                placeholder="Add expense name..."
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-lg"
            >
                Amount: 
            </label>
            <input 
                type="number"
                className="px-4 py-2 border border-transparent bg-slate-100 rounded-2xl focus:outline-none focus:border-sky-500"
                id="amount"
                placeholder="Add expense amount..."
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-lg"
            >
                Category: 
            </label>
            <select 
                className="px-4 py-2 border border-transparent bg-slate-100 rounded-2xl focus:outline-none focus:border-sky-500"
                id="category"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="" disabled>Select</option>
                {categories.map(category => (
                    <option 
                        value={category.id}
                        key={category.id}
                    >{category.name}</option>
                ))}
            </select>
        </div>
        
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-lg"
            >
                Expense Date: 
            </label>
            <DatePicker 
                onChange={handleChangeDate}
                value={expense.date} 
                className={'bg-slate-100 p-2 border-0'}
            />
        </div>

        {error && <ErrorMessage >{error}</ErrorMessage>}


        <input 
            type="submit" 
            className="w-full p-2 font-bold text-white uppercase transition border-2 cursor-pointer bg-sky-600 rounded-2xl border-sky-600 hover:bg-sky-400"
            value={'Save Expense'}
        />
        
    </form>
  )
}
