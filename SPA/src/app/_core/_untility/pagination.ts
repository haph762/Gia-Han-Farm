export interface Pagination {
    totalCount : number;
    totalPage : number;
    currentPage : number;
    pageSize : number;
}

export class PaginationResult<T>{
    result: T[];
    pagination : Pagination;
}