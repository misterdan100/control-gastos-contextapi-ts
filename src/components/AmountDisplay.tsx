import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

export default function AmountDisplay(props: AmountDisplayProps) {

    const { label, amount } = props
  return (

    <p className="text-2xl font-semibold text-sky-600">
        {label && `${label}: `}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
    
  )
}
