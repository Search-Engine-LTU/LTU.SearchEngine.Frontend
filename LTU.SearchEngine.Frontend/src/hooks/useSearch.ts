import { useState } from 'react';
import { validateQuery } from '../validation/SearchValidator';
// import { mockSearchResults } from './mockData';
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
            
            console.log(data);
            
            // const pageSize = 10;
            // const startIndex = (page - 1) * pageSize;
            // const endIndex = startIndex + pageSize;

            // const paginatedResults = data.searchResults.slice(startIndex, endIndex);
                
            setSearchData({...data});

            console.log("Valid query sent to API:", query); 

        } catch (err) {
            setError(`A network error occurred while searching. Err: ${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    return { executeSearch, searchData, error, warning, isLoading };
};