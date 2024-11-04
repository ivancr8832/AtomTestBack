export interface Pagination<T>{
    totalRecords: number,
    totalPages: number,
    items: T,
    currentPage: number
}