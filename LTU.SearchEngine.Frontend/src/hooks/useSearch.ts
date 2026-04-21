import { useState } from 'react';
import { validateQuery } from '../validation/SearchValidator';
import { mockSearchResults } from './mockData';
import type { SearchResponse } from '../models/SearchInterface';
import { fetchFromApi } from '../api/SearchService';

export const useSearch = () => {
    const [error, setError] = useState<string | undefined>();
    const [warning, setWarning] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState<SearchResponse | undefined>(undefined);

    const executeSearch = async (query: string, page: number = 1) => {
        const validation = validateQuery(query);

        setError(validation.errorMessage);
        setWarning(validation.warningMessage);
        setSearchData(undefined);

        if (!validation.isValid) return; 
        

        try {

            setIsLoading(true);
            const data = await fetchFromApi(query, page)
            // // simulating API delay (NFRQ-6001 req: response within 10s)
            // await new Promise(resolve => setTimeout(resolve, 800));

            //     //if user searches on word "empty" we pretend that backend doesnt find anything
            //     if(query.toLowerCase() === "empty") {
            //         setSearchData({
            //             results: [],
            //             totalResults: 0,
            //             currentPage: 1,
            //             pageSize: 10,
            //             totalPages: 0  
            //         });

            //         return;
            //     }

            setSearchData(mockSearchResults);
                // Here we going to make our API call to backend.api (searchcontroller)
                // Exempel: const response = await FrontendClient.get(`/api/search?q=${encodeURIComponent(query)}`);
                // setResults(response.data);

            const pageSize = 10;
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;

            const paginatedResults = mockSearchResults.results.slice(startIndex, endIndex);
                
            setSearchData({
                ...mockSearchResults,
                results: paginatedResults,
                currentPage: page
            });

            console.log("Valid query sent to API:", query); 

        } catch (err) {
            setError(`A network error occurred while searching. Err: ${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    return { executeSearch, searchData, error, warning, isLoading };
};