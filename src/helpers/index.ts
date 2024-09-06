export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: "currency", currency: 'USD',
    }).format(amount)
}

export const formatData = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

// input: '2024-09-05'
// output: '04/09/2024'