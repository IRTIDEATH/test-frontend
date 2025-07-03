export type TCategory = {
    id: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TSearchFilters = {
    search: string;
};

export type TCategoryListResponse = {
    data: TCategory[];
    totalData: number;
    currentPage: number;
    totalPages: number;
};

export type TPaginationState = {
    pageIndex: number;
    pageSize: number
};