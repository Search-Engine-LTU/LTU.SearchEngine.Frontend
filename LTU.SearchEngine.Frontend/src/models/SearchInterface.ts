// Interface that matches our SearchResponse in backend
export interface SearchResultItem {
    title: string;    // FRQ-3013
    url: string;
    snippet: string;  // FRQ-3014
}

export interface SearchResponse {
    results: SearchResultItem[];
    currentPage: number; // FRQ-4002
    pageSize: number;
    totalResults: number;
    totalPages: number;
}