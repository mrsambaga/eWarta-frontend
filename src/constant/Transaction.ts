export type TransactionResponseDTO = {
    transactionId: number
    status: string
    total: number
    subscription: string
}

export type TransactionRequestDTO = {
    status: string
    total: number
    paymentDate: Date | null
    voucherId: number
    subscriptionId: number
}

export type EditTransactionRequestDTO = {
    total: number
    transactionId: number
}