import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className="p-2 text-sm font-medium text-center text-red-600 border-b-2 border-red-600">
        {children}
    </p>
  )
}
