type ApiResponse<T> = {
    status: number
    message: string
    body: T
}

export default ApiResponse