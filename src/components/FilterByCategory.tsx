import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  const {state, dispatch} = useBudget()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'add-filter-category', payload: {id: e.target.value}})
  }
  return (
    <div className="px-10 py-5 mt-5 bg-white rounded-lg shadow-lg">
      <form>
        <p className="mb-5 text-2xl font-medium text-center text-gray-600">
          Expenses List
        </p>
        <div className="flex flex-wrap justify-center gap-2">
        <div className="mb-2">
              <label className={`px-4 py-2 transition  rounded-xl hover:bg-gray-200 ${state.currentCategory === '' ? 'bg-gray-300' : 'bg-gray-100'} cursor-pointer`}>
                <input
                  name="category"
                  type="radio"
                  value=''
                  checked={state.currentCategory === ''}
                  onChange={handleChange}
                  className="hidden"
                />
                All
              </label>
            </div>
          {categories.map((category) => (
            <div key={category.id} className="mb-2">
              <label className={`px-4 py-2 transition  rounded-xl hover:bg-gray-200 ${state.currentCategory === category.id ? 'bg-gray-300' : 'bg-gray-100'} cursor-pointer`}>
                <input
                  name="category"
                  type="radio"
                  value={category.id}
                  checked={state.currentCategory === category.id}
                  onChange={handleChange}
                  className="hidden"
                />
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
