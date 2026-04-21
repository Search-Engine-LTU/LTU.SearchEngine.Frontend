// Interface that matches our SearchResponse in backend
export interface SearchResultItem {
    id: number;
    title: string;    // FRQ-3013
    url: string;
    pageRankScore: number;
    TflDfScore: number;
    // snippet: string;  // FRQ-3014
    language: string
}

export interface SearchResponse {
    searchResults: SearchResultItem[];
    currentPage: number; // FRQ-4002
    pageSize: number;
    totalResults: number;
    totalPages: number;
    message: string; 
}