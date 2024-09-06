import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <img src="/public/grafico.jpg" alt="grafica" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <button
          type="button"
          className="w-full p-2 font-bold text-white uppercase transition bg-pink-600 border-2 border-pink-600 rounded-2xl hover:bg-pink-500"
        >
          Reset App
        </button>

        <AmountDisplay 
          label='Budget'
          amount={300}
        />

        <AmountDisplay 
          label='Available'
          amount={200}
        />

        <AmountDisplay 
          label='Spend'
          amount={100}
        />
      </div>
    </div>
  )
}
