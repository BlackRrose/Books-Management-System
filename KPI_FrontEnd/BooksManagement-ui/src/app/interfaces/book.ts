export interface Book { //a class/
    id: number
    title: string
    author: string
    isbn: string
    price: number
    publishedDate?: Date
    description?: string
    isFlipped:Boolean
}